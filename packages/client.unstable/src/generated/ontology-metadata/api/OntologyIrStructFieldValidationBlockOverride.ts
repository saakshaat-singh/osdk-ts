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

import type { OntologyIrAllowedStructFieldValuesOverride } from "./OntologyIrAllowedStructFieldValuesOverride.js";
import type { OntologyIrStructFieldPrefillOverride } from "./OntologyIrStructFieldPrefillOverride.js";
import type { ParameterRequiredOverride } from "./ParameterRequiredOverride.js";
import type { VisibilityOverride } from "./VisibilityOverride.js";
export interface OntologyIrStructFieldValidationBlockOverride_parameterRequired {
  type: "parameterRequired";
  parameterRequired: ParameterRequiredOverride;
}

export interface OntologyIrStructFieldValidationBlockOverride_visibility {
  type: "visibility";
  visibility: VisibilityOverride;
}

export interface OntologyIrStructFieldValidationBlockOverride_allowedValues {
  type: "allowedValues";
  allowedValues: OntologyIrAllowedStructFieldValuesOverride;
}

export interface OntologyIrStructFieldValidationBlockOverride_prefill {
  type: "prefill";
  prefill: OntologyIrStructFieldPrefillOverride;
}
export type OntologyIrStructFieldValidationBlockOverride =
  | OntologyIrStructFieldValidationBlockOverride_parameterRequired
  | OntologyIrStructFieldValidationBlockOverride_visibility
  | OntologyIrStructFieldValidationBlockOverride_allowedValues
  | OntologyIrStructFieldValidationBlockOverride_prefill;
