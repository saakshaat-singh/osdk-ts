/*
 * Copyright 2024 Palantir Technologies, Inc. All rights reserved.
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

import type { ObjectOrInterfaceDefinition, Osdk } from "@osdk/api";

export function consolidateOsdkObject<
  T extends Osdk.Instance<V, any, any>,
  U extends Osdk.Instance<V, any, any>,
  V extends ObjectOrInterfaceDefinition,
>(
  oldObject: T,
  upToDateObject: U,
): T {
  const combinedObject = oldObject;

  for (const key in combinedObject) {
    if (upToDateObject.hasOwnProperty(key)) {
      combinedObject[key] = upToDateObject[key] as any;
    }
  }

  return combinedObject;
}
