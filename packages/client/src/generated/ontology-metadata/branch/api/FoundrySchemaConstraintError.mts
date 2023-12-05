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

import type { ColumnMissingFromBackingDatasourceForLinkTypeError } from "./ColumnMissingFromBackingDatasourceForLinkTypeError.mjs";
import type { ColumnMissingFromBackingDatasourceForObjectTypeError } from "./ColumnMissingFromBackingDatasourceForObjectTypeError.mjs";
import type { LinkTypePropertiesReferenceSameColumnError } from "./LinkTypePropertiesReferenceSameColumnError.mjs";
import type { LinkTypePropertyIncompatibleBackingColumnTypeError } from "./LinkTypePropertyIncompatibleBackingColumnTypeError.mjs";
import type { ObjectTypePropertyIncompatibleBackingColumnTypeError } from "./ObjectTypePropertyIncompatibleBackingColumnTypeError.mjs";
import type { SchemaForLinkTypeDatasourceNotFoundError } from "./SchemaForLinkTypeDatasourceNotFoundError.mjs";
import type { SchemaForObjectTypeDatasourceNotFoundError } from "./SchemaForObjectTypeDatasourceNotFoundError.mjs";
export interface FoundrySchemaConstraintError_columnMissingFromBackingDatasourceForObjectType {
  type: "columnMissingFromBackingDatasourceForObjectType";
  columnMissingFromBackingDatasourceForObjectType:
    ColumnMissingFromBackingDatasourceForObjectTypeError;
}

export interface FoundrySchemaConstraintError_columnMissingFromBackingDatasourceForLinkType {
  type: "columnMissingFromBackingDatasourceForLinkType";
  columnMissingFromBackingDatasourceForLinkType:
    ColumnMissingFromBackingDatasourceForLinkTypeError;
}

export interface FoundrySchemaConstraintError_objectTypePropertyIncompatibleBackingColumnType {
  type: "objectTypePropertyIncompatibleBackingColumnType";
  objectTypePropertyIncompatibleBackingColumnType:
    ObjectTypePropertyIncompatibleBackingColumnTypeError;
}

export interface FoundrySchemaConstraintError_linkTypePropertyIncompatibleBackingColumnType {
  type: "linkTypePropertyIncompatibleBackingColumnType";
  linkTypePropertyIncompatibleBackingColumnType:
    LinkTypePropertyIncompatibleBackingColumnTypeError;
}

export interface FoundrySchemaConstraintError_linkTypePropertiesReferenceSameColumn {
  type: "linkTypePropertiesReferenceSameColumn";
  linkTypePropertiesReferenceSameColumn:
    LinkTypePropertiesReferenceSameColumnError;
}

export interface FoundrySchemaConstraintError_schemaForObjectTypeDatasourceNotFound {
  type: "schemaForObjectTypeDatasourceNotFound";
  schemaForObjectTypeDatasourceNotFound:
    SchemaForObjectTypeDatasourceNotFoundError;
}

export interface FoundrySchemaConstraintError_schemaForLinkTypeDatasourceNotFound {
  type: "schemaForLinkTypeDatasourceNotFound";
  schemaForLinkTypeDatasourceNotFound: SchemaForLinkTypeDatasourceNotFoundError;
}

export type FoundrySchemaConstraintError =
  | FoundrySchemaConstraintError_columnMissingFromBackingDatasourceForObjectType
  | FoundrySchemaConstraintError_columnMissingFromBackingDatasourceForLinkType
  | FoundrySchemaConstraintError_objectTypePropertyIncompatibleBackingColumnType
  | FoundrySchemaConstraintError_linkTypePropertyIncompatibleBackingColumnType
  | FoundrySchemaConstraintError_linkTypePropertiesReferenceSameColumn
  | FoundrySchemaConstraintError_schemaForObjectTypeDatasourceNotFound
  | FoundrySchemaConstraintError_schemaForLinkTypeDatasourceNotFound;
