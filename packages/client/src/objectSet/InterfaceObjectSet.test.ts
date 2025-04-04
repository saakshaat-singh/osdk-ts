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

import {
  $ontologyRid,
  Employee,
  FooInterface,
} from "@osdk/client.test.ontology";
import { apiServer } from "@osdk/shared.test";
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  expectTypeOf,
  it,
} from "vitest";

import type { Osdk, PropertyKeys } from "@osdk/api";
import type { Client } from "../Client.js";
import { createClient } from "../createClient.js";

describe("ObjectSet", () => {
  let client: Client;

  beforeAll(async () => {
    apiServer.listen();
    client = createClient(
      "https://stack.palantir.com",
      $ontologyRid,
      async () => "myAccessToken",
    );
  });

  afterAll(() => {
    apiServer.close();
  });

  it("does not allow intersect/union/subtract with implementing interface types, for now", () => {
    const employeeObjectSet = client(Employee);
    const fooInterfaceSet = client(FooInterface);

    // @ts-expect-error
    employeeObjectSet.union(fooInterfaceSet);

    // @ts-expect-error
    employeeObjectSet.subtract(fooInterfaceSet);

    // @ts-expect-error
    employeeObjectSet.intersect(fooInterfaceSet);
  });

  it("interface objects set loading", async () => {
    const objectSet = client(FooInterface);
    let iter = 0;
    const { data: interfacers } = await objectSet.fetchPage();
    for (const foo of interfacers) {
      expect(foo.fooSpt).toEqual("Santa Claus");
      iter++;
    }
    expect(iter).toEqual(1);
  });

  it("allows fetching by field from a interface object set - where clause", async () => {
    const whereClausedInterface = await client(FooInterface).where({
      fooSpt: "The Grinch",
    }).fetchPage({ $includeAllBaseObjectProperties: true });

    const interfaceObj = whereClausedInterface.data[0];
    expect(interfaceObj.fooSpt).toEqual("The Grinch");

    const asEmployee = interfaceObj.$as(Employee);
    expectTypeOf<typeof asEmployee>().toEqualTypeOf<
      Osdk.Instance<Employee, "$allBaseProperties", PropertyKeys<Employee>, {}>
    >;

    expect(asEmployee.fullName).toEqual("The Grinch");
    expect(asEmployee.office).toEqual("Where the Grinch Lives");

    const whereClausedInterface2 = await client(FooInterface).where({
      fooSpt: "The Grinch",
    }).fetchPage({
      $includeAllBaseObjectProperties: false,
    });

    const interfaceObj2 = whereClausedInterface2.data[0];
    expect(interfaceObj2.fooSpt).toEqual("The Grinch");
    const asEmployee2 = interfaceObj2.$as(Employee);

    expectTypeOf<typeof asEmployee2>().toEqualTypeOf<
      Osdk.Instance<Employee, never, "fullName", {}>
    >;

    expect(asEmployee2.fullName).toEqual("The Grinch");
    // @ts-expect-error
    expect(asEmployee2.office).toBeUndefined();
  });
});
