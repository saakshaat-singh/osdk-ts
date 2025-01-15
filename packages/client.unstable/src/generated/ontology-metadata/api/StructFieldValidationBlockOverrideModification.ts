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

import type { AllowedStructFieldValuesOverrideModification } from "./AllowedStructFieldValuesOverrideModification.js";
import type { ParameterRequiredOverride } from "./ParameterRequiredOverride.js";
import type { StructFieldPrefillOverrideModification } from "./StructFieldPrefillOverrideModification.js";
import type { VisibilityOverride } from "./VisibilityOverride.js";
export interface StructFieldValidationBlockOverrideModification_parameterRequired {
  type: "parameterRequired";
  parameterRequired: ParameterRequiredOverride;
}

export interface StructFieldValidationBlockOverrideModification_visibility {
  type: "visibility";
  visibility: VisibilityOverride;
}

export interface StructFieldValidationBlockOverrideModification_allowedValues {
  type: "allowedValues";
  allowedValues: AllowedStructFieldValuesOverrideModification;
}

export interface StructFieldValidationBlockOverrideModification_prefill {
  type: "prefill";
  prefill: StructFieldPrefillOverrideModification;
}
export type StructFieldValidationBlockOverrideModification =
  | StructFieldValidationBlockOverrideModification_parameterRequired
  | StructFieldValidationBlockOverrideModification_visibility
  | StructFieldValidationBlockOverrideModification_allowedValues
  | StructFieldValidationBlockOverrideModification_prefill;
