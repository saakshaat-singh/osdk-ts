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

import type {
  InterfaceMetadata,
  NullabilityAdherence,
  ObjectMetadata,
} from "@osdk/api";
import type {
  InterfaceToObjectTypeMappings,
  InterfaceTypeApiName,
  OntologyObjectV2,
} from "@osdk/foundry.ontologies";
import invariant from "tiny-invariant";
import type { MinimalClient } from "../MinimalClientContext.js";
import {
  type FetchedObjectTypeDefinition,
} from "../ontology/OntologyProvider.js";
import { createOsdkObject } from "./convertWireToOsdkObjects/createOsdkObject.js";
import type { InterfaceHolder } from "./convertWireToOsdkObjects/InterfaceHolder.js";
import type { ObjectHolder } from "./convertWireToOsdkObjects/ObjectHolder.js";
import { createObjectSpecifierFromPrimaryKey } from "./createObjectSpecifierFromPrimaryKey.js";
import type { SimpleOsdkProperties } from "./SimpleOsdkProperties.js";

/**
 * If interfaceApiName is not undefined, converts the instances of the
 * interface into their respective
 * underlying concrete types and then returns the $as() representation
 * for the consumers.
 *
 * Otherwise just does the conversion
 *
 * May mutate in place for performance reasons. If you need a clean copy,
 * keep it first.
 *
 * However, you must use the returned value, which will be whatever is correct.
 *
 * @internal
 * @param interfaceApiName - if undefined
 */
export async function convertWireToOsdkObjects(
  client: MinimalClient,
  objects: OntologyObjectV2[],
  interfaceApiName: string | undefined,
  forceRemoveRid: boolean = false,
  selectedProps?: ReadonlyArray<string>,
  strictNonNull: NullabilityAdherence = false,
): Promise<Array<ObjectHolder | InterfaceHolder>> {
  client.logger?.debug(`START convertWireToOsdkObjects()`);

  // remove the __ prefixed properties and convert them to $ prefixed.
  // updates in place
  fixObjectPropertiesInPlace(objects, forceRemoveRid);

  const ifaceDef = interfaceApiName
    ? await client.ontologyProvider.getInterfaceDefinition(interfaceApiName)
    : undefined;
  const ifaceSelected = ifaceDef
    ? (selectedProps ?? Object.keys(ifaceDef.properties))
    : undefined;

  const ret = [];
  for (const rawObj of objects) {
    const objectDef = await client.ontologyProvider.getObjectDefinition(
      rawObj.$apiName,
    );
    invariant(objectDef, `Missing definition for '${rawObj.$apiName}'`);

    // default value for when we are checking an object
    let objProps;

    let conforming = true;
    if (ifaceDef && ifaceSelected) {
      // API returns interface spt names but we cache by real values
      invariantInterfacesAsViews(objectDef, ifaceDef.apiName, client);

      conforming &&= isConforming(client, ifaceDef, rawObj, ifaceSelected);

      reframeAsObjectInPlace(objectDef, ifaceDef.apiName, rawObj);

      objProps = convertInterfacePropNamesToObjectPropNames(
        objectDef,
        ifaceDef.apiName,
        ifaceSelected,
      );
    } else {
      objProps = selectedProps ?? Object.keys(objectDef.properties);
    }

    conforming &&= isConforming(client, objectDef, rawObj, objProps);

    if (strictNonNull === "throw" && !conforming) {
      throw new Error(
        "Unable to safely convert objects as some non nullable properties are null",
      );
    } else if (strictNonNull === "drop" && !conforming) {
      continue;
    }

    let osdkObject: ObjectHolder | InterfaceHolder = createOsdkObject(
      client,
      objectDef,
      rawObj,
    );
    if (interfaceApiName) osdkObject = osdkObject.$as(interfaceApiName);

    ret.push(osdkObject);
  }

  client.logger?.debug(`END convertWireToOsdkObjects()`);
  return ret;
}

export async function convertWireToOsdkObjects2(
  client: MinimalClient,
  objects: OntologyObjectV2[],
  interfaceApiName: string,
  forceRemoveRid?: boolean,
  selectedProps?: ReadonlyArray<string>,
  strictNonNull?: NullabilityAdherence,
  interfaceToObjectTypeMappings?: Record<
    InterfaceTypeApiName,
    InterfaceToObjectTypeMappings
  >,
): Promise<Array<InterfaceHolder>>;
export async function convertWireToOsdkObjects2(
  client: MinimalClient,
  objects: OntologyObjectV2[],
  interfaceApiName: undefined,
  forceRemoveRid?: boolean,
  selectedProps?: ReadonlyArray<string>,
  strictNonNull?: NullabilityAdherence,
  interfaceToObjectTypeMappings?: Record<
    InterfaceTypeApiName,
    InterfaceToObjectTypeMappings
  >,
): Promise<Array<ObjectHolder>>;
export async function convertWireToOsdkObjects2(
  client: MinimalClient,
  objects: OntologyObjectV2[],
  interfaceApiName: string | undefined,
  forceRemoveRid?: boolean,
  selectedProps?: ReadonlyArray<string>,
  strictNonNull?: NullabilityAdherence,
  interfaceToObjectTypeMappings?: Record<
    InterfaceTypeApiName,
    InterfaceToObjectTypeMappings
  >,
): Promise<Array<ObjectHolder | InterfaceHolder>>;
/**
 * @internal
 */
export async function convertWireToOsdkObjects2(
  client: MinimalClient,
  objects: OntologyObjectV2[],
  interfaceApiName: string | undefined,
  forceRemoveRid: boolean = false,
  selectedProps?: ReadonlyArray<string>,
  strictNonNull: NullabilityAdherence = false,
  interfaceToObjectTypeMappings: Record<
    InterfaceTypeApiName,
    InterfaceToObjectTypeMappings
  > = {},
): Promise<Array<ObjectHolder | InterfaceHolder>> {
  client.logger?.debug(`START convertWireToOsdkObjects2()`);

  fixObjectPropertiesInPlace(objects, forceRemoveRid);

  const ret = [];
  for (const rawObj of objects) {
    const objectDef = await client.ontologyProvider.getObjectDefinition(
      rawObj.$apiName,
    );
    invariant(objectDef, `Missing definition for '${rawObj.$apiName}'`);

    const interfaceToObjMapping = interfaceApiName
      ? interfaceToObjectTypeMappings[interfaceApiName as InterfaceTypeApiName][
        rawObj.$apiName
      ]
      : undefined;

    const ifaceSelected = interfaceApiName && interfaceToObjMapping
      ? (selectedProps
        ? Object.keys(interfaceToObjMapping).filter(
          val => {
            selectedProps?.includes(interfaceToObjMapping[val]);
          },
        )
        : [
          ...Object.values(interfaceToObjMapping),
          objectDef.primaryKeyApiName,
        ])
      : undefined;

    // default value for when we are checking an object
    let objProps;

    let conforming = true;
    if (interfaceApiName && ifaceSelected) {
      invariantInterfacesAsViews(objectDef, interfaceApiName, client);

      objProps = ifaceSelected;
    } else {
      objProps = selectedProps ?? Object.keys(objectDef.properties);
    }

    conforming &&= isConforming(client, objectDef, rawObj, objProps);

    if (strictNonNull === "throw" && !conforming) {
      throw new Error(
        "Unable to safely convert objects as some non nullable properties are null",
      );
    } else if (strictNonNull === "drop" && !conforming) {
      continue;
    }

    let osdkObject: ObjectHolder | InterfaceHolder = createOsdkObject(
      client,
      objectDef,
      rawObj,
    );
    if (interfaceApiName) osdkObject = osdkObject.$as(interfaceApiName);

    ret.push(osdkObject);
  }

  client.logger?.debug(`END convertWireToOsdkObjects2()`);
  return ret;
}

/**
 * @internal
 *
 * Utility function that lets us take down selected property names from an interface
 * and convert them to an array of property names on an object.
 */
export function convertInterfacePropNamesToObjectPropNames(
  objectDef: FetchedObjectTypeDefinition,
  interfaceApiName: string,
  ifacePropsToMap: readonly string[],
): string[] {
  return ifacePropsToMap.map((ifaceProp) =>
    objectDef.interfaceMap[interfaceApiName][ifaceProp]
  );
}

/**
 * Takes a raw object from the wire (contextually as an interface) and
 * updates the fields to reflect the underlying objectDef instead
 * @param objectDef
 * @param interfaceApiName
 * @param client
 * @param rawObj
 */
function reframeAsObjectInPlace(
  objectDef: FetchedObjectTypeDefinition,
  interfaceApiName: string,
  rawObj: OntologyObjectV2,
) {
  const newProps: Record<string, any> = {};
  for (
    const [sptProp, regularProp] of Object.entries(
      objectDef.interfaceMap[interfaceApiName],
    )
  ) {
    if (sptProp in rawObj) {
      const value = rawObj[sptProp];
      delete rawObj[sptProp];
      if (value !== undefined) {
        newProps[regularProp] = value;
      }
    }
  }
  Object.assign(rawObj, newProps);

  if (!(objectDef.primaryKeyApiName in rawObj)) {
    rawObj[objectDef.primaryKeyApiName] = rawObj.$primaryKey;
  }
}

function isConforming(
  client: MinimalClient,
  def:
    | InterfaceMetadata
    | ObjectMetadata,
  obj: OntologyObjectV2,
  propsToCheck: readonly string[],
) {
  for (const propName of propsToCheck) {
    if (
      propName in def.properties && def.properties[propName].nullable === false
      && obj[propName] == null
    ) {
      if (process.env.NODE_ENV !== "production") {
        client.logger?.debug(
          {
            obj: {
              $apiName: obj["$apiName"],
              $objectType: obj["$objectType"],
              $primaryKey: obj["$primaryKey"],
            },
          },
          `Found object that does not conform to its definition. Expected ${def.apiName}'s ${propName} to not be null.`,
        );
      }
      return false;
    }
  }
  return true;
}

function invariantInterfacesAsViews(
  objectDef: FetchedObjectTypeDefinition,
  interfaceApiName: string,
  client: MinimalClient,
): asserts objectDef is typeof objectDef & { interfaceMap: {} } {
  if (objectDef.interfaceMap?.[interfaceApiName] == null) {
    const warning =
      "Interfaces are only supported 'as views' but your metadata object is missing the correct information. This suggests your interfaces have not been migrated to the newer version yet and you cannot use this version of the SDK.";
    if (client.logger) {
      client.logger.warn(warning);
    } else {
      // eslint-disable-next-line no-console
      console.error(`WARNING! ${warning}`);
    }
    throw new Error(warning);
  }
}

function fixObjectPropertiesInPlace(
  objs: OntologyObjectV2[],
  forceRemoveRid: boolean,
): asserts objs is SimpleOsdkProperties[] {
  for (const obj of objs) {
    if (forceRemoveRid) {
      delete obj.__rid;
    }

    if (obj.__rid) {
      obj.$rid = obj.__rid;
      delete obj.__rid;
    }

    // Backend returns as __apiName but we want to stick to $ structure
    obj.$apiName ??= obj.__apiName;

    // for now these are the same but when we start doing interface projections the $objectType will always be underlying and
    // the $apiName will be for the current view (in current designs)
    obj.$objectType = obj.$apiName;

    // copying over for now as its always returned. In the future, this should just be inferred from underlying
    obj.$primaryKey ??= obj.__primaryKey;
    obj.$title ??= obj.__title;

    obj.$objectSpecifier = createObjectSpecifierFromPrimaryKey(
      { apiName: obj.$apiName, type: "object" },
      obj.$primaryKey,
    );

    // we don't want people to use these
    delete obj.__apiName;
    delete obj.__primaryKey;
    delete obj.__title;
  }
}
