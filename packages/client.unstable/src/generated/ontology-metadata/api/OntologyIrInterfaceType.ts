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

import type { InterfaceTypeApiName } from "./InterfaceTypeApiName.js";
import type { InterfaceTypeDisplayMetadata } from "./InterfaceTypeDisplayMetadata.js";
import type { OntologyIrInterfaceLinkType } from "./OntologyIrInterfaceLinkType.js";
import type { OntologyIrInterfaceTypeStatus } from "./OntologyIrInterfaceTypeStatus.js";
import type { OntologyIrSharedPropertyType } from "./OntologyIrSharedPropertyType.js";

/**
 * Represents a collection of properties that object types can implement. If an object type implements an
 * interface, it is guaranteed to have the conform to the interface shape.
 */
export interface OntologyIrInterfaceType {
  apiName: InterfaceTypeApiName;
  displayMetadata: InterfaceTypeDisplayMetadata;
  status: OntologyIrInterfaceTypeStatus;
  properties: Array<OntologyIrSharedPropertyType>;
  allProperties: Array<OntologyIrSharedPropertyType>;
  extendsInterfaces: Array<InterfaceTypeApiName>;
  allExtendsInterfaces: Array<InterfaceTypeApiName>;
  links: Array<OntologyIrInterfaceLinkType>;
  allLinks: Array<OntologyIrInterfaceLinkType>;
}
