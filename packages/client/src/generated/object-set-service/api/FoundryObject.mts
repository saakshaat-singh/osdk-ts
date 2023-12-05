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

import type { ObjectPrimaryKeyV2 } from "./ObjectPrimaryKeyV2.mjs";
import type { ObjectRid } from "./ObjectRid.mjs";
import type { ObjectTypeRid } from "./ObjectTypeRid.mjs";
import type { ObjectVersion } from "./ObjectVersion.mjs";
import type { PropertyId } from "./PropertyId.mjs";
import type { PropertyTypeRid } from "./PropertyTypeRid.mjs";
import type { PropertyValue } from "./PropertyValue.mjs";

export interface FoundryObject {
  objectRid: ObjectRid | undefined;
  objectTypeRid: ObjectTypeRid;
  primaryKey: ObjectPrimaryKeyV2;
  title: string;
  properties: Map<PropertyTypeRid, PropertyValue>;
  runtimeDerivedProperties: Map<PropertyId, PropertyValue>;
  score: string | undefined;
  version: ObjectVersion;
}
