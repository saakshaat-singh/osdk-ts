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

import type { InterfaceTypeRidOrIdInRequest } from "../../api/InterfaceTypeRidOrIdInRequest.js";
import type { ObjectTypeId } from "../../api/ObjectTypeId.js";
import type { ObjectTypeRid } from "../../api/ObjectTypeRid.js";
import type { PropertyTypeId } from "../../api/PropertyTypeId.js";
import type { PropertyTypeRid } from "../../api/PropertyTypeRid.js";

/**
 * An object type implements an interface by explicitly mapping properties. One of the SPTs on the interface has
 * the same apiName as a local property on the object type without the two being explicitly mapped. This is
 * disallowed.
 */
export interface LocalAndSharedPropertyTypesConflictingApiNamesError {
  objectRid: ObjectTypeRid;
  objectTypeId: ObjectTypeId | undefined;
  interfaceTypeRidOrIdInRequest: InterfaceTypeRidOrIdInRequest;
  propertyTypeRid: PropertyTypeRid;
  propertyTypeId: PropertyTypeId | undefined;
}
