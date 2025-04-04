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

import type { ObjectTypeId } from "../ObjectTypeId.js";
import type { CreateObjectOption } from "./CreateObjectOption.js";

/**
 * ObjectReferenceType specifies that this parameter must be an ObjectLocator. An additional optional field maybeCreateObjectOption is included for handling upsert action types by providing flexibility of object creation from a user-specified PK or auto-generated UID PK.
 */
export interface ObjectReferenceType {
  objectTypeId: ObjectTypeId;
  maybeCreateObjectOption: CreateObjectOption | undefined;
}
