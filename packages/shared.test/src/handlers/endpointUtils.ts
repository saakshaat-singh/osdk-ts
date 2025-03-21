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

import type { PageToken } from "@osdk/foundry.core";
import stableStringify from "json-stable-stringify";

export interface PagedBodyResponse<T> {
  nextPageToken?: string;
  data: T[];
}

export interface PagedBodyResponseWithTotal<T> extends PagedBodyResponse<T> {
  totalCount: string;
}

export type PagedRequest = {
  excludeRid?: boolean;
  pageSize?: number;
  pageToken?: string;
};

export function pageThroughResponse<
  TData,
  TRequest extends PagedRequest,
  TResponse extends
    | PagedBodyResponse<TData>
    | PagedBodyResponseWithTotal<TData>,
  TIncludeCount
    extends (TResponse extends PagedBodyResponseWithTotal<TData> ? true
      : false),
>(
  handlers: { [key: string]: TResponse["data"] },
  request: TRequest,
  includeCount: TIncludeCount,
):
  | (TIncludeCount extends true ? PagedBodyResponseWithTotal<TData>
    : PagedBodyResponse<TData>)
  | undefined
{
  const { pageSize, pageToken, excludeRid, ...requestWithoutPagination } =
    request;

  let data = handlers[stableStringify(requestWithoutPagination)];

  if (data === undefined) {
    return undefined;
  }

  if (excludeRid) {
    data = data.map(a => {
      a = { ...a };
      delete (a as any).__rid;
      return a;
    });
  }

  const size = request.pageSize ? Number(request.pageSize) : 1000;
  const pageCount = Math.ceil(data.length / size);
  const currentPage = request.pageToken ? Number(request.pageToken) : 0;

  if (currentPage < 0 || currentPage >= pageCount) {
    return undefined;
  }

  const startIndex = currentPage * size;
  const endIndex = Math.min(startIndex + size, data.length);
  const nextPageToken = currentPage + 1 < pageCount
    ? (currentPage + 1).toString()
    : undefined;

  const ret: PagedBodyResponse<TData> | PagedBodyResponseWithTotal<TData> = {
    nextPageToken,
    data: data.slice(startIndex, endIndex),
    ...(includeCount
      ? { totalCount: "" + data.length }
      : {}),
  };

  return ret as
    | (TIncludeCount extends true ? PagedBodyResponseWithTotal<TData>
      : PagedBodyResponse<TData>)
    | undefined;
}

export function pageThroughResponseSearchParams<
  TData,
  TIncludeCount extends boolean,
>(
  iter: Iterable<TData>,
  { pageSize = 1000, pageToken }: {
    pageSize: number | undefined;
    pageToken: PageToken | undefined;
  },
  includeCount?: TIncludeCount,
):
  | (TIncludeCount extends true ? PagedBodyResponseWithTotal<TData>
    : PagedBodyResponse<TData>)
  | undefined
{
  const data = Array.from(iter);
  const pageCount = Math.ceil(data.length / pageSize);
  const currentPage = pageToken ? Number(pageToken) : 0;

  if (currentPage < 0 || currentPage >= pageCount) {
    return undefined;
  }

  const startIndex = currentPage * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  const nextPageToken = currentPage + 1 < pageCount
    ? (currentPage + 1).toString()
    : undefined;

  const ret: PagedBodyResponse<TData> | PagedBodyResponseWithTotal<TData> = {
    nextPageToken,
    data: data.slice(startIndex, endIndex),
    ...(includeCount
      ? { totalCount: String(data.length) }
      : {}),
  };

  return ret as
    | (TIncludeCount extends true ? PagedBodyResponseWithTotal<TData>
      : PagedBodyResponse<TData>)
    | undefined;
}

export function areArrayBuffersEqual(
  buffer1: ArrayBuffer,
  buffer2: ArrayBuffer,
): boolean {
  if (buffer1.byteLength !== buffer2.byteLength) {
    return false;
  }

  const array1 = new Uint8Array(buffer1);
  const array2 = new Uint8Array(buffer2);

  return array1.every((value, index) => value === array2[index]);
}
