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

import type { OntologyIrAggregatedPropertiesDefinition } from "./OntologyIrAggregatedPropertiesDefinition.js";
import type { OntologyIrLinkedPropertiesDefinition } from "./OntologyIrLinkedPropertiesDefinition.js";
export interface OntologyIrDerivedPropertiesDefinition_linkedProperties {
  type: "linkedProperties";
  linkedProperties: OntologyIrLinkedPropertiesDefinition;
}

export interface OntologyIrDerivedPropertiesDefinition_aggregatedProperties {
  type: "aggregatedProperties";
  aggregatedProperties: OntologyIrAggregatedPropertiesDefinition;
}
export type OntologyIrDerivedPropertiesDefinition =
  | OntologyIrDerivedPropertiesDefinition_linkedProperties
  | OntologyIrDerivedPropertiesDefinition_aggregatedProperties;
