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

import type { ObjectTypeTraitPropertySpecification } from "./ObjectTypeTraitPropertySpecification.js";
import type { WorkflowObjectTypeTraitPropertyDescription } from "./WorkflowObjectTypeTraitPropertyDescription.js";
import type { WorkflowObjectTypeTraitPropertyDisplayName } from "./WorkflowObjectTypeTraitPropertyDisplayName.js";
import type { WorkflowObjectTypeTraitPropertyId } from "./WorkflowObjectTypeTraitPropertyId.js";

/**
 * Represents a property of a `WorkflowObjectTypeTrait`. For example, an Alert WorkflowObjectTypeTrait may have a required 'Assignee' WorkflowObjectTypeTraitProperty. All ObjectType(s) derived from the Alert WorkflowObjectTypeTrait must provide provide a property that conforms to the corresponding ObjectTypeTraitPropertySpecification
 */
export interface WorkflowObjectTypeTraitProperty {
  displayName: WorkflowObjectTypeTraitPropertyDisplayName;
  id: WorkflowObjectTypeTraitPropertyId;
  specification: ObjectTypeTraitPropertySpecification;
  description: WorkflowObjectTypeTraitPropertyDescription;
}
