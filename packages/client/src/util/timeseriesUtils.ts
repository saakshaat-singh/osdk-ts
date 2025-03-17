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

import type { TimeSeriesQuery, TimeSeriesQueryV2, TimeSeriesRange } from "@osdk/api";
import { TimeseriesDurationMapping } from "@osdk/api";
import type { StreamTimeSeriesPointsRequest, TimeRange } from "@osdk/foundry.ontologies";
import { iterateReadableStream, parseStreamedResponse } from "./streamutils.js";

export function getTimeRange(body: TimeSeriesQuery): TimeRange {
  if ("$startTime" in body || "$endTime" in body) {
    return {
      type: "absolute",
      startTime: body.$startTime,
      endTime: body.$endTime,
    };
  }
  return body.$before
    ? {
      type: "relative",
      startTime: {
        when: "BEFORE",
        value: body.$before,
        unit: TimeseriesDurationMapping[body.$unit],
      },
    }
    : {
      type: "relative",
      endTime: {
        when: "AFTER",
        value: body.$after!,
        unit: TimeseriesDurationMapping[body.$unit],
      },
    };
}

export const getTimeRangeV2 = (query: TimeSeriesRange): TimeRange | undefined => {
  switch(query.kind) {
    case "absolute":
      return {
        type: "absolute",
        startTime: query.startTime,
        endTime: query.endTime,
      };
    case "relative":
      return query.before
      ? {
        type: "relative",
        startTime: {
          when: "BEFORE",
          value: query.before,
          unit: TimeseriesDurationMapping[query.unit],
        },
      }
      : {
        type: "relative",
        endTime: {
          when: "AFTER",
          value: query.after!,
          unit: TimeseriesDurationMapping[query.unit],
        },
      };
    default:
      return undefined;
  }
}

export const parseTimeSeriesQuery = (body: TimeSeriesQuery | TimeSeriesQueryV2 | undefined): {
  range?: TimeRange,
} => {
  if(body === undefined) {
    return {};
  }
  switch(body.kind) {
    case "v1":
      return {
        range: getTimeRange(body),
      };
    case "v2":
      return {
        range: body.range ? getTimeRangeV2(body.range) : undefined,
      }
    default:
      return {}
  }
};

export async function* asyncIterPointsHelper<
  T extends number | string | GeoJSON.Point,
>(
  iterator: Response,
): AsyncGenerator<
  {
    time: any;
    value: T;
  },
  void,
  unknown
> {
  const reader = iterator.body?.getReader()!;
  for await (
    const point of parseStreamedResponse(iterateReadableStream(reader))
  ) {
    yield {
      time: point.time,
      value: point.value as T,
    };
  }
}
