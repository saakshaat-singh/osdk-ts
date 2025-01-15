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

import { type ConjureContext, conjureFetch } from "conjure-lite";
import type { OntologyBranchRid } from "../../../api/OntologyBranchRid.js";
import type { MergeOntologyServiceBranchRequest } from "../MergeOntologyServiceBranchRequest.js";
import type { MergeOntologyServiceBranchResponse } from "../MergeOntologyServiceBranchResponse.js";

/**
 * Merge a service branch from a service external to OMS. This endpoint should only be called by
 * services with the "ontology:service-branch-merge" operation on the
 * "ri.ontology.<instance>.service-branch-root.1" resource.
 */
export async function mergeOntologyServiceBranch(
  ctx: ConjureContext,
  onBehalfOf: string,
  ontologyBranchRid: OntologyBranchRid,
  request: MergeOntologyServiceBranchRequest,
): Promise<MergeOntologyServiceBranchResponse> {
  return conjureFetch(
    ctx,
    `/ontology/branch/service-branch/merge/${ontologyBranchRid}`,
    "PUT",
    request,
  );
}
