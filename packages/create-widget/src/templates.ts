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

export type SdkVersion = "1.x" | "2.x";

export type ModuleImportFiles = Map<
  string,
  | {
    type: "base64";
    body: string;
  }
  | {
    type: "raw";
    body: string;
  }
>;

export interface Template {
  id: string;
  label: string;
  envPrefix: string;
  buildDirectory: string;
  requiresOsdk: boolean;
  hidden?: boolean;
  isBeta?: boolean;
  files: {
    [K in SdkVersion]?: () => Promise<ModuleImportFiles>;
  };
}

export interface TemplateContext {
  project: string;
  osdkPackage?: string;
}
