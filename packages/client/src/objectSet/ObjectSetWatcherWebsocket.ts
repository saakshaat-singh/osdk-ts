/*
 * Copyright 2023 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  type ObjectTypesFrom,
  type OntologyDefinition,
  type ThinClient,
} from "@osdk/api";
import type { OntologyObjectV2 } from "@osdk/gateway/types";
import type { ConjureContext } from "conjure-lite";
import WebSocket from "isomorphic-ws";
import invariant from "tiny-invariant";
import type { OsdkObjectFrom } from "..";
import type { ObjectSet as OssObjectSet } from "../generated/object-set-service/api";
import { createTemporaryObjectSet } from "../generated/object-set-service/api/ObjectSetService.js";
import type { FoundryObject } from "../generated/object-set-watcher/object/FoundryObject.js";
import { batchEnableWatcher } from "../generated/object-set-watcher/ObjectSetWatchService.js";
import type { StreamMessage } from "../generated/object-set-watcher/StreamMessage.js";
import { loadOntologyEntities } from "../generated/ontology-metadata/api/OntologyMetadataService";
import { convertWireToOsdkObjects } from "../object/convertWireToOsdkObjects";
import { Deferred } from "./Deferred";
import type { ObjectSet } from "./ObjectSet";
import type { ObjectSetListener } from "./ObjectSetWatcher";

export class ObjectSetWatcherWebsocket<
  O extends OntologyDefinition<any, any, any>,
> {
  static #instances = new WeakMap<
    ThinClient<any>,
    ObjectSetWatcherWebsocket<any>
  >();

  static getInstance<O extends OntologyDefinition<any, any, any>>(
    client: ThinClient<O>,
  ) {
    let instance = ObjectSetWatcherWebsocket.#instances.get(client);
    if (instance == null) {
      instance = new ObjectSetWatcherWebsocket(client);
      ObjectSetWatcherWebsocket.#instances.set(client, instance);
    }
    return instance;
  }

  #ws: WebSocket | undefined;
  #client: ThinClient<O>;
  #pendingListeners = new Map<
    string,
    { deferred: Deferred<() => void>; listener: ObjectSetListener<O, any> }
  >();
  #listeners = new Map<string, ObjectSetListener<O, any>>();
  #conjureContext: ConjureContext;

  private constructor(client: ThinClient<O>) {
    this.#client = client;

    const stackUrl = new URL(client.stack);
    this.#conjureContext = {
      baseUrl: stackUrl.origin,
      servicePath: "object-set-watcher/api",
      fetchFn: client.fetch,
      tokenProvider: async () => await client.tokenProvider(),
    };
  }

  async subscribe<K extends ObjectTypesFrom<O>>(
    objectSet: ObjectSet<O, K>,
    listener: ObjectSetListener<O, K>,
  ): Promise<() => void> {
    const [temporaryObjectSet] = await Promise.all([
      // create a time-bounded object set representation for watching
      this.#createTemporaryObjectSet(objectSet),

      this.#ensureWebsocket(),

      // look up the object type's rid and ensure that we have enabled object set watcher for that rid
      this.#getObjectType(
        this.#client.ontology.metadata.ontologyRid,
        getObjectSetBaseType(objectSet),
      ).then(objectTypeMetadata =>
        this.#enableObjectSetsWatcher([objectTypeMetadata.rid])
      ),
    ]);

    // subscribe to object set
    const requestId = crypto.randomUUID();
    const subscribe = {};

    const deferred = new Deferred<() => void>();

    this.#pendingListeners.set(requestId, { deferred, listener });
    this.#ws?.send(JSON.stringify(subscribe));

    return deferred.promise;
  }

  async #ensureWebsocket() {
    if (this.#ws == null) {
      const { stack, tokenProvider } = this.#client;
      const base = new URL(stack);
      // TODO support alternate contextPath values
      const url =
        `wss://${base.host}/object-set-watcher/ws/streamSubscriptions`;
      const token = await tokenProvider();
      this.#ws = new WebSocket(url, [`Bearer-${token}`]);

      this.#ws.addEventListener("error", () => {
        this.#destroyWebsocket();
      });

      this.#ws.addEventListener("close", () => {
        this.#destroyWebsocket();
      });

      this.#ws.addEventListener("message", this.#onMessage);

      return new Promise<void>((resolve, reject) => {
        this.#ws!.addEventListener("open", () => {
          resolve();
        });
        this.#ws!.addEventListener("error", (event: WebSocket.ErrorEvent) => {
          reject(new Error(event.toString()));
        });
      });
    }
  }

  async #onMessage(message: WebSocket.MessageEvent) {
    const data = JSON.parse(message.data.toString()) as StreamMessage;
    switch (data.type) {
      case "objectSetChanged": {
        const { id: subscriptionId, objects } = data.objectSetChanged;
        const listener = this.#listeners.get(subscriptionId);
        const convertedObjects = await convertFoundryToOsdkObjects(
          this.#client,
          this.#conjureContext,
          objects,
        );
        listener?.change?.(convertedObjects);
        break;
      }

      case "refreshObjectSet": {
        const { id: subscriptionId } = data.refreshObjectSet;
        const listener = this.#listeners.get(subscriptionId);
        listener?.refresh?.();
        break;
      }

      case "subscribeResponses": {
        const { id: requestId, responses } = data.subscribeResponses;

        const pendingData = this.#pendingListeners.get(requestId);

        if (pendingData == null) {
          throw new Error(
            "Got a subscription response for a requestId we weren't expecting",
          );
        }

        const { deferred, listener } = pendingData;
        this.#pendingListeners.delete(requestId);

        if (responses.length !== 1) {
          deferred.reject(
            "Got more than one response but we only expect a single one",
          );
        }

        const response = responses[0];
        switch (response.type) {
          case "error":
            deferred.reject(response.error);
            return;
          case "qos":
            deferred.reject(response.qos);
            this.#destroyWebsocket();
            return;
          case "success":
            const { id: subscriptionId } = response.success;
            this.#listeners.set(subscriptionId, listener);
            deferred.resolve(() => {
              // TODO there isn't actually a network call to unsubscribe the socket yet
              this.#listeners.delete(subscriptionId);
              if (this.#listeners.size === 0) {
                this.#destroyWebsocket();
              }
            });
            break;
          default:
            const _: never = response;
            deferred.reject(response);
        }

        break;
      }

      default:
        const _: never = data;
    }
  }

  async #getObjectType(ontologyRid: string, objectApiName: string) {
    // call getObjectType from conjure
    return { rid: "rid" };
  }

  async #enableObjectSetsWatcher(objectTypeRids: string[]) {
    return batchEnableWatcher(this.#conjureContext, {
      requests: objectTypeRids,
    });
  }

  async #createTemporaryObjectSet<K extends ObjectTypesFrom<O>>(
    objectSet: ObjectSet<O, K>,
  ) {
    // TODO do we need to do something when the subscription expires on the server?
    createTemporaryObjectSet(this.#conjureContext, {
      objectSet: toConjureObjectSet(objectSet),
      timeToLive: "ONE_DAY",
      objectSetFilterContext: { parameterOverrides: {} as Map<any, any> },
    });
    return { objectSetRid: "objectSetRid" };
  }

  #destroyWebsocket() {
    if (this.#ws) {
      this.#ws.close();
      this.#ws = undefined;
    }

    for (const listener of this.#listeners.values()) {
      listener.cancelled?.();
    }
    this.#listeners.clear();
  }
}

function getObjectSetBaseType<
  O extends OntologyDefinition<any>,
  K extends ObjectTypesFrom<O>,
>(objectSet: ObjectSet<O, K>) {
  return "baseType";
}

function toConjureObjectSet<
  O extends OntologyDefinition<any>,
  K extends ObjectTypesFrom<O>,
>(objectSet: ObjectSet<O, K>): OssObjectSet {
}

async function convertFoundryToOsdkObjects<
  O extends OntologyDefinition<any>,
  K extends ObjectTypesFrom<O>,
>(
  client: ThinClient<any>,
  ctx: ConjureContext,
  objects: ReadonlyArray<FoundryObject>,
): Promise<Array<OsdkObjectFrom<K, O>>> {
  const osdkObjects: OsdkObjectFrom<K, O>[] = await Promise.all(
    objects.map(async object => {
      const propertyMapping = await getOntologyPropertyMapping(ctx, object);
      const convertedObject: OntologyObjectV2 = Object.fromEntries([
        ...Object.entries(object.properties).map(([key, value]) => {
          return [propertyMapping?.propertyIdToApiNameMapping[key], value];
        }),
        [
          propertyMapping
            ?.propertyIdToApiNameMapping[Object.entries(object.key)[0][0]],
          Object.entries(object.key)[0][1],
        ],
        [
          "__apiName",
          propertyMapping?.apiName,
        ],
      ]);

      return convertWireToOsdkObjects<K & string, O>(
        client,
        propertyMapping?.apiName! as K & string,
        [
          convertedObject,
        ],
      ) as unknown as OsdkObjectFrom<K, O>;
    }),
  );

  return osdkObjects;
}

type ObjectPropertyMapping = {
  apiName: string;
  propertyIdToApiNameMapping: Record<string, string>;
};

const objectTypeMapping = new WeakMap<
  ConjureContext,
  Map<string, ObjectPropertyMapping>
>();

async function getOntologyPropertyMapping(
  ctx: ConjureContext,
  object: FoundryObject,
) {
  if (!objectTypeMapping.has(ctx)) {
    objectTypeMapping.set(ctx, new Map());
  }

  const objectRid = object.type;
  if (
    objectTypeMapping.get(ctx)!.has(objectRid)
  ) {
    const entities = await loadOntologyEntities(ctx, {
      objectTypeVersions: {
        [objectRid]: undefined,
      },
      linkTypeVersions: {},
      loadRedacted: false,
      includeObjectTypesWithoutSearchableDatasources: true,
    });

    invariant(entities.objectTypes[objectRid], "object type should be loaded");

    const propertyMapping: Record<string, string> = Object.fromEntries(
      Object.values(entities.objectTypes[objectRid].propertyTypes).map(
        property => {
          return [property.id, property.apiName!];
        },
      ),
    );

    objectTypeMapping.get(ctx)?.set(objectRid, {
      apiName: entities.objectTypes[objectRid].apiName!,
      propertyIdToApiNameMapping: propertyMapping,
    });
  }

  return objectTypeMapping.get(ctx)?.get(objectRid);
}
