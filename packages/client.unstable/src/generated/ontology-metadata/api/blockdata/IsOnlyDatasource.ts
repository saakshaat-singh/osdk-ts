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

/**
 * Will only match if there is a single datasource that matches the output type (e.g. a dataset datasource
 * with an export dataset, or a restricted view datasource with an export restricted view). In the case of exporting
 * an RV datasource as a dataset, use DatasourcePredicate#hasRid instead.
 */
export interface IsOnlyDatasource {
}
