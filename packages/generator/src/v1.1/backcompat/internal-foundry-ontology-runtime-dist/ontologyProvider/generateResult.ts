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

import * as path from "node:path";
import type { MinimalFs } from "../../../../MinimalFs";
import { formatTs } from "../../../../util/test/formatTs";
import { reexportConsts } from "../../util/reexportConsts";
import { reexportTypes } from "../../util/reexportTrash";

export async function generateResult(
  fs: MinimalFs,
  ontologyProviderDir: string,
) {
  await fs.writeFile(
    path.join(ontologyProviderDir, "Result.ts"),
    await formatTs(
      `import {FoundryApiError} from "@osdk/legacy-client";
        `
        + reexportTypes(["Ok", "Err"], "<T>")
        + reexportTypes(["Result"], "<V, E = FoundryApiError>", "<V,E>")
        + reexportConsts(["isOk", "isErr", "visitError"])
        + reexportTypes(
          ["ErrorVisitor"],
          "<E extends FoundryApiError, R>",
          "<E,R>",
        )
        + reexportTypes(
          ["ExtractKeysWithType"],
          "<T, K extends keyof T>",
          "<T,K>",
        ),
    ),
  );
}
