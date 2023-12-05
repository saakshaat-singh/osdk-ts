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

import type { NonNumericSeriesValueMetadata } from "./NonNumericSeriesValueMetadata.mjs";
import type { NumericOrNonNumericSeriesValueMetadata } from "./NumericOrNonNumericSeriesValueMetadata.mjs";
import type { NumericSeriesValueMetadata } from "./NumericSeriesValueMetadata.mjs";
export interface SeriesValueMetadata_numeric {
  type: "numeric";
  numeric: NumericSeriesValueMetadata;
}

export interface SeriesValueMetadata_enum {
  type: "enum";
  enum: NonNumericSeriesValueMetadata;
}

export interface SeriesValueMetadata_numericOrNonNumeric {
  type: "numericOrNonNumeric";
  numericOrNonNumeric: NumericOrNonNumericSeriesValueMetadata;
}

export type SeriesValueMetadata =
  | SeriesValueMetadata_numeric
  | SeriesValueMetadata_enum
  | SeriesValueMetadata_numericOrNonNumeric;
