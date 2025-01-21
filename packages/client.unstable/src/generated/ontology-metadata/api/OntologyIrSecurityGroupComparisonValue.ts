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

import type { ObjectTypeFieldApiName } from "./ObjectTypeFieldApiName.js";
import type { SecurityGroupComparisonConstant } from "./SecurityGroupComparisonConstant.js";
import type { SecurityGroupComparisonUserProperty } from "./SecurityGroupComparisonUserProperty.js";
export interface OntologyIrSecurityGroupComparisonValue_constant {
  type: "constant";
  constant: SecurityGroupComparisonConstant;
}

export interface OntologyIrSecurityGroupComparisonValue_property {
  type: "property";
  property: ObjectTypeFieldApiName;
}

export interface OntologyIrSecurityGroupComparisonValue_userProperty {
  type: "userProperty";
  userProperty: SecurityGroupComparisonUserProperty;
}
export type OntologyIrSecurityGroupComparisonValue =
  | OntologyIrSecurityGroupComparisonValue_constant
  | OntologyIrSecurityGroupComparisonValue_property
  | OntologyIrSecurityGroupComparisonValue_userProperty;
