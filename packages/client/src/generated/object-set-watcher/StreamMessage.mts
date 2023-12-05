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

import type { ObjectSetSubscribeResponses } from "./ObjectSetSubscribeResponses.mjs";
import type { ObjectSetUpdates } from "./ObjectSetUpdates.mjs";
import type { RefreshObjectSet } from "./RefreshObjectSet.mjs";
export interface StreamMessage_subscribeResponses {
  type: "subscribeResponses";
  subscribeResponses: ObjectSetSubscribeResponses;
}

export interface StreamMessage_objectSetChanged {
  type: "objectSetChanged";
  objectSetChanged: ObjectSetUpdates;
}

export interface StreamMessage_refreshObjectSet {
  type: "refreshObjectSet";
  refreshObjectSet: RefreshObjectSet;
}

export type StreamMessage =
  | StreamMessage_subscribeResponses
  | StreamMessage_objectSetChanged
  | StreamMessage_refreshObjectSet;
