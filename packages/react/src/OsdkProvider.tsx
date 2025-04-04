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

import type { Client } from "@osdk/client";
import React from "react";
import { OsdkContext } from "./OsdkContext.js";

export function OsdkProvider({
  children,
  client,
}: {
  children: React.ReactNode;
  client: Client;
}): React.JSX.Element {
  return (
    <OsdkContext.Provider value={{ client }}>{children}</OsdkContext.Provider>
  );
}
