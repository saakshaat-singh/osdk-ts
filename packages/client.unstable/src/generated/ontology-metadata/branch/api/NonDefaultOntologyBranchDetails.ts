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

import type { BranchId } from "../../api/BranchId.js";
import type { OntologyBranchRid } from "../../api/OntologyBranchRid.js";
import type { OntologyVersion } from "../../api/OntologyVersion.js";
import type { BranchIndexingConfig } from "./BranchIndexingConfig.js";
import type { BranchStatus } from "./BranchStatus.js";
import type { OntologyBranchAttribution } from "./OntologyBranchAttribution.js";
import type { OntologyBranchModificationData } from "./OntologyBranchModificationData.js";
import type { OntologyProposalV2 } from "./OntologyProposalV2.js";
import type { OwnerIdentifier } from "./OwnerIdentifier.js";
export interface NonDefaultOntologyBranchDetails {
  attribution: OntologyBranchAttribution;
  createdAtOntologyVersion: OntologyVersion;
  latestRebasedOntologyVersion: OntologyVersion;
  datasourceBranchId: BranchId | undefined;
  ownerIdentifier: OwnerIdentifier;
  status: BranchStatus;
  branchModificationData: OntologyBranchModificationData;
  indexingConfig: BranchIndexingConfig;
  proposal: OntologyProposalV2 | undefined;
  parentBranchRid: OntologyBranchRid;
}
