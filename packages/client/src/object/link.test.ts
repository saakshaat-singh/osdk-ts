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

import { apiServer, stubData } from "@osdk/shared.test";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Client } from "../Client.js";
import { createClient } from "../createClient.js";
import { Ontology as MockOntology } from "../generatedNoCheck/index.js";

describe("OsdkObject", () => {
  describe("link", () => {
    let client: Client<typeof MockOntology>;

    beforeAll(async () => {
      apiServer.listen();
      client = createClient(
        MockOntology,
        "https://stack.palantir.com",
        () => "myAccessToken",
      );
    });

    afterAll(() => {
      apiServer.close();
    });

    it("loads an employee", async () => {
      const result = await client.objects.Employee.where({
        employeeId: stubData.employee1.employeeId,
      }).fetchPageOrThrow();
      console.log("result", result);
      expect(result).not.toBe(null);
    });
  });
});
