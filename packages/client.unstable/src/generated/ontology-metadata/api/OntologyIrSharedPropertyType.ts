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

import type { BaseFormatter } from "./BaseFormatter.js";
import type { DataConstraints } from "./DataConstraints.js";
import type { SharedPropertyTypeAlias } from "./entitymetadata/SharedPropertyTypeAlias.js";
import type { ObjectTypeFieldApiName } from "./ObjectTypeFieldApiName.js";
import type { OntologyIrType } from "./OntologyIrType.js";
import type { SharedPropertyTypeDisplayMetadata } from "./SharedPropertyTypeDisplayMetadata.js";
import type { TypeClass } from "./TypeClass.js";
import type { SharedPropertyTypeGothamMapping } from "./typemapping/SharedPropertyTypeGothamMapping.js";
import type { ValueTypeApiNameReference } from "./ValueTypeApiNameReference.js";

/**
 * A property type that can be shared across object types.
 */
export interface OntologyIrSharedPropertyType {
  apiName: ObjectTypeFieldApiName;
  displayMetadata: SharedPropertyTypeDisplayMetadata;
  indexedForSearch: boolean;
  baseFormatter: BaseFormatter | undefined;
  type: OntologyIrType;
  typeClasses: Array<TypeClass>;
  dataConstraints: DataConstraints | undefined;
  gothamMapping: SharedPropertyTypeGothamMapping | undefined;
  valueType: ValueTypeApiNameReference | undefined;
  aliases: Array<SharedPropertyTypeAlias>;
}
