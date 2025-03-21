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

import type {
  ExecuteQueryRequest,
  ExecuteQueryResponse,
} from "@osdk/foundry.ontologies";
import { employee1, employee2 } from "./objects.js";
import {
  addOneQueryType,
  queryTypeAcceptsObjects,
  queryTypeAcceptsObjectSets,
  queryTypeAcceptsThreeDimensionalAggregation,
  queryTypeAcceptsTwoDimensionalAggregation,
  queryTypeReturnsArray,
  queryTypeReturnsComplexStruct,
  queryTypeReturnsDate,
  queryTypeReturnsMap,
  queryTypeReturnsObject,
  queryTypeReturnsStruct,
  queryTypeReturnsTimestamp,
  queryTypeThreeDimensionalAggregation,
  queryTypeTwoDimensionalAggregation,
} from "./queryTypes.js";

export const addOneQueryRequest: ExecuteQueryRequest = {
  parameters: {
    n: 2,
  },
};

export const addOneQueryRequestWithNoResponse: ExecuteQueryRequest = {
  parameters: {
    n: 3,
  },
};

export const addOneQueryResponse: ExecuteQueryResponse = {
  value: 3,
};

export const queryTypeReturnsStructRequest: ExecuteQueryRequest = {
  parameters: {
    person: {
      firstName: "John",
      lastName: "Doe",
      age: 42,
    },
  },
};

export const queryTypeReturnsStructResponse: ExecuteQueryResponse = {
  value: {
    firstName: "John",
    lastName: "Doe",
    age: 43,
  },
};

export const queryTypeReturnsComplexStructRequest: ExecuteQueryRequest = {
  parameters: {
    person: {
      firstName: "John",
      lastName: "Doe",
      age: 42,
      object: employee1.__primaryKey,
    },
  },
};

export const queryTypeReturnsComplexStructResponse: ExecuteQueryResponse = {
  value: {
    firstName: "John",
    lastName: "Doe",
    age: 43,
    object: employee2.__primaryKey,
  },
};

export const queryTypeReturnsTimestampResponse: ExecuteQueryResponse = {
  value: "2019-01-01T00:00:00.000Z",
};

export const queryTypeReturnsDateResponse: ExecuteQueryResponse = {
  value: "2019-01-01",
};

export const queryTypeReturnsObjectResponse: ExecuteQueryResponse = {
  value: employee1.__primaryKey,
};

export const queryTypeAcceptsObjectRequest: ExecuteQueryRequest = {
  parameters: { object: employee1.__primaryKey },
};

export const queryTypeAcceptsObjectResponse: ExecuteQueryResponse = {
  value: employee2.__primaryKey,
};

export const queryTypeAcceptsObjectSetRequest: ExecuteQueryRequest = {
  parameters: {
    objectSet: { type: "base", objectType: "Employee" },
  },
};

export const queryTypeAcceptsObjectSetResponse: ExecuteQueryResponse = {
  value: {
    objectSet: { type: "base", objectType: "Employee" },
  },
};

export const queryTypeThreeDimensionalAggregationResponse:
  ExecuteQueryResponse = {
    value: {
      groups: [
        {
          key: "Q-AFN",
          groups: [
            {
              key: {
                startValue: "2010-10-01T00:00:00Z",
                endValue: "2010-10-02T00:00:00Z",
              },
              value: 65.0,
            },
          ],
        },
        {
          key: "Q-AFO",
          groups: [],
        },
      ],
    },
  };

export const queryTypeTwoDimensionalAggregationResponse: ExecuteQueryResponse =
  {
    value: {
      groups: [
        {
          key: "Q-AFN",
          value: 1,
        },
        {
          key: "Q-AFO",
          value: 2,
        },
      ],
    },
  };

export const queryTypeAcceptsTwoDimensionalAggregationRequest:
  ExecuteQueryRequest = {
    parameters: {
      aggFunction: {
        groups: [
          {
            key: "testKey1",
            value: 1,
          },
          {
            key: "testKey2",
            value: 2,
          },
        ],
      },
    },
  };

export const queryTypeAcceptsTwoDimensionalAggregationResponse:
  ExecuteQueryResponse = {
    value: {
      groups: [
        {
          key: "responseKey1",
          value: 3,
        },
        {
          key: "responseKey2",
          value: 4,
        },
      ],
    },
  };

export const queryTypeAcceptsThreeDimensionalAggregationRequest:
  ExecuteQueryRequest = {
    parameters: {
      aggFunction: {
        groups: [
          {
            key: "testKey1",
            groups: [
              {
                key: {
                  startValue: "2010-10-01T00:00:00Z",
                  endValue: "2010-10-02T00:00:00Z",
                },
                value: 65.0,
              },
            ],
          },
          {
            key: "testKey2",
            groups: [],
          },
        ],
      },
    },
  };

export const queryTypeAcceptsThreeDimensionalAggregationResponse:
  ExecuteQueryResponse = {
    value: {
      groups: [
        {
          key: "Q-AFN",
          groups: [
            {
              key: {
                startValue: "2010-10-01T00:00:00Z",
                endValue: "2010-10-02T00:00:00Z",
              },
              value: 65.0,
            },
          ],
        },
        {
          key: "Q-AFO",
          groups: [],
        },
      ],
    },
  };

export const queryTypeReturnsArrayRequest: ExecuteQueryRequest = {
  parameters: {
    people: ["Brad", "George", "Ryan"],
  },
};

export const queryTypeReturnsArrayResponse: ExecuteQueryResponse = {
  value: ["Pitt", "Clooney", "Reynolds"],
};

export const queryTypeReturnsMapRequest: ExecuteQueryRequest = {
  parameters: {
    peopleMap: [{ key: "person1", value: "hi" }],
  },
};

export const queryTypeReturnsMapResponse: ExecuteQueryResponse = {
  value: [{ key: "50030", value: "bye" }],
};

export const emptyBody: string = JSON.stringify({
  parameters: {},
});

export const queryRequestHandlers: {
  [queryApiName: string]: {
    [queryBody: string]: ExecuteQueryResponse;
  };
} = {
  [addOneQueryType.apiName]: {
    [JSON.stringify(addOneQueryRequest)]: addOneQueryResponse,
    [JSON.stringify(addOneQueryRequestWithNoResponse)]: { value: undefined },
  },
  [queryTypeReturnsStruct.apiName]: {
    [JSON.stringify(queryTypeReturnsStructRequest)]:
      queryTypeReturnsStructResponse,
  },
  [queryTypeReturnsComplexStruct.apiName]: {
    [JSON.stringify(queryTypeReturnsComplexStructRequest)]:
      queryTypeReturnsComplexStructResponse,
  },
  [queryTypeReturnsTimestamp.apiName]: {
    [emptyBody]: queryTypeReturnsTimestampResponse,
  },
  [queryTypeReturnsDate.apiName]: {
    [emptyBody]: queryTypeReturnsDateResponse,
  },
  [queryTypeReturnsObject.apiName]: {
    [emptyBody]: queryTypeReturnsObjectResponse,
  },
  [queryTypeTwoDimensionalAggregation.apiName]: {
    [emptyBody]: queryTypeTwoDimensionalAggregationResponse,
  },
  [queryTypeThreeDimensionalAggregation.apiName]: {
    [emptyBody]: queryTypeThreeDimensionalAggregationResponse,
  },
  [queryTypeAcceptsObjects.apiName]: {
    [JSON.stringify(queryTypeAcceptsObjectRequest)]:
      queryTypeAcceptsObjectResponse,
  },
  [queryTypeAcceptsObjectSets.apiName]: {
    [JSON.stringify(queryTypeAcceptsObjectSetRequest)]:
      queryTypeAcceptsObjectSetResponse,
  },
  [queryTypeAcceptsTwoDimensionalAggregation.apiName]: {
    [JSON.stringify(queryTypeAcceptsTwoDimensionalAggregationRequest)]:
      queryTypeAcceptsTwoDimensionalAggregationResponse,
  },
  [queryTypeAcceptsThreeDimensionalAggregation.apiName]: {
    [JSON.stringify(queryTypeAcceptsThreeDimensionalAggregationRequest)]:
      queryTypeAcceptsThreeDimensionalAggregationResponse,
  },
  [queryTypeReturnsArray.apiName]: {
    [JSON.stringify(queryTypeReturnsArrayRequest)]:
      queryTypeReturnsArrayResponse,
  },
  [queryTypeReturnsMap.apiName]: {
    [JSON.stringify(queryTypeReturnsMapRequest)]: queryTypeReturnsMapResponse,
  },
};
