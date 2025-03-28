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

import { PalantirApiError } from "@osdk/client";
import { Datasets } from "@osdk/foundry";
import { platformClient as client } from "./client.js";
import { logger } from "./logger.js";

export async function runFoundrySdkClientVerificationTest(
  datasetRid: string,
  branchToCreate = "test",
): Promise<void> {
  const pageSize = 10;

  // will throw if dataset not found
  const dataset = await Datasets.Datasets.get(client, datasetRid);
  logger.info({ dataset }, `Loaded dataset ${datasetRid}`);

  const branchesResult = await Datasets.Branches.list(
    client,
    datasetRid,
    { pageSize },
  );
  logger.info(
    { branchesResult },
    `Loaded branches for dataset ${datasetRid}`,
  );

  if (branchesResult.nextPageToken) {
    throw new Error(
      `You cannot run this test on a dataset with more than ${pageSize} branches`,
    );
  }

  if (!branchesResult.data.find(b => b.name === "master")) {
    throw new Error(
      `You can not run this test as dataset ${datasetRid} does not have a master branch.`,
    );
  }

  if (branchesResult.data.find(b => b.name === branchToCreate)) {
    throw new Error(
      `Expected that dataset ${datasetRid} would not have a branch called "${branchToCreate}". Aborting`,
    );
  }

  // We want to be sure the error is filled out nicely, so we can use the `master` branch
  // now that we know it exists.
  try {
    await Datasets.Branches.create(client, datasetRid, {
      name: "master",
    });
    throw new Error("createBranch(master) should have failed");
  } catch (err) {
    if (err instanceof PalantirApiError) {
      if (err.errorName !== "BranchAlreadyExists") {
        const msg = `Expected BranchAlreadyExists error, got ${err.errorName}`;
        logger.error(err, msg);
        throw new Error(msg);
      }

      logger.info({ err }, "Expected an error and caught it");
    } else {
      throw err;
    }
  }

  const testBranch = await Datasets.Branches.create(
    client,
    datasetRid,
    { name: branchToCreate },
  );
  logger.info({ testBranch }, "Created test branch");

  // Returns Promise<void> and should not error
  await Datasets.Branches.deleteBranch(
    client,
    datasetRid,
    testBranch.name,
  );

  logger.info(
    testBranch,
    "Created and deleted test branch, which means we handled the Promise<void> correctly",
  );
}
