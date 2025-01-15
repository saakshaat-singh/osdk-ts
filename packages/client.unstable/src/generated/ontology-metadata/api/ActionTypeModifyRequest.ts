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

import type { ActionsVersion } from "./ActionsVersion.js";
import type { ActionTypeRid } from "./ActionTypeRid.js";
import type { EditActionTypeRequest } from "./EditActionTypeRequest.js";
import type { PutActionTypeRequest } from "./PutActionTypeRequest.js";

/**
 * Request used to modify ActionTypes.
 */
export interface ActionTypeModifyRequest {
  createActionTypes: Array<PutActionTypeRequest>;
  deleteActionTypes: Array<ActionTypeRid>;
  editActionTypes: Record<ActionTypeRid, EditActionTypeRequest>;
  actionsVersion: ActionsVersion | undefined;
}
