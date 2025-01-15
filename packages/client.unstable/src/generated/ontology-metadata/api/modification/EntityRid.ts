/*
 * Copyright 2025 Palantir Technologies, Inc. All rights reserved.
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

import type { ActionTypeRid } from "../ActionTypeRid.js";
import type { InterfaceTypeRid } from "../InterfaceTypeRid.js";
import type { LinkTypeRid } from "../LinkTypeRid.js";
import type { ObjectTypeRid } from "../ObjectTypeRid.js";
import type { SharedPropertyTypeRid } from "../SharedPropertyTypeRid.js";
export interface EntityRid_objectTypeRid {
  type: "objectTypeRid";
  objectTypeRid: ObjectTypeRid;
}

export interface EntityRid_linkTypeRid {
  type: "linkTypeRid";
  linkTypeRid: LinkTypeRid;
}

export interface EntityRid_actionTypeRid {
  type: "actionTypeRid";
  actionTypeRid: ActionTypeRid;
}

export interface EntityRid_interfaceTypeRid {
  type: "interfaceTypeRid";
  interfaceTypeRid: InterfaceTypeRid;
}

export interface EntityRid_sharedPropertyTypeRid {
  type: "sharedPropertyTypeRid";
  sharedPropertyTypeRid: SharedPropertyTypeRid;
}
/**
 * Resource identifier of the entity which you would like to download the history of
 */
export type EntityRid =
  | EntityRid_objectTypeRid
  | EntityRid_linkTypeRid
  | EntityRid_actionTypeRid
  | EntityRid_interfaceTypeRid
  | EntityRid_sharedPropertyTypeRid;
