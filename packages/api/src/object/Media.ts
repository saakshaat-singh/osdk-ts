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

export interface Media {
  /**
   * Fetches metadata for media reference property
   */
  fetchMetadata(): Promise<MediaMetadata>;
  /**
   * Fetches content of a media reference property
   */
  fetchContents(): Promise<Response>;
  /**
   * Returns base64 encoded contents
   */
  fetchAsBase64Url(): Promise<string>;
}

/**
 * Unique identifier of a media item in Foundry.
 */
export interface MediaReference {
  mimeType: string;
  reference: {
    type: "mediaSetViewItem";
    mediaSetViewItem: {
      mediaItemRid: string;
      mediaSetRid: string;
      mediaSetViewRid: string;
    };
  };
}

/**
 * Metadata of a media item
 */
export interface MediaMetadata {
  path?: string;
  sizeBytes: number;
  mediaType: string;
}
