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

import { generateClientSdkVersionOneDotOne } from "@osdk/generator";
import * as realFs from "node:fs/promises";

export function go(basePath: string) {
  generateClientSdkVersionOneDotOne(
    {
      rid: "ridHere",
      actionTypes: [],
      apiName: "OntologyApiName",
      objectTypes: {
        Todo: {
          apiName: "Todo",
          primaryKey: "id",
          displayName: "AwesomeTodoDisplayname",
          description: "Its a todo item.",
          properties: {
            id: {
              dataType: {
                type: "integer",
              },
            },
            body: {
              dataType: {
                type: "string",
              },
              description: "The text of the todo",
              displayName: "Body",
            },
            complete: {
              dataType: {
                type: "boolean",
              },
            },
          },
          status: "ACTIVE",
          rid: "ridForTodo",
        },
        Person: {
          apiName: "Person",
          primaryKey: "email",
          displayName: "Person",
          description: "A person",
          properties: {
            email: {
              dataType: {
                type: "string",
              },
            },
          },

          rid: "ridForPerson",
          status: "ACTIVE",
        },
        ObjectTypeWithAllPropertyTypes: {
          apiName: "ObjectTypeWithAllPropertyTypes",
          primaryKey: "id",
          displayName: "ObjectTypeWithAllPropertyTypes",
          description: "A type with all property types",
          rid: "ridForObjectTypeWithAllPropertyTypes",
          status: "ACTIVE",
          properties: {
            id: {
              dataType: {
                type: "integer",
              },
            },
            string: {
              dataType: {
                type: "string",
              },
            },
            boolean: {
              dataType: {
                type: "boolean",
              },
            },
            date: {
              dataType: {
                type: "date",
              },
            },
            dateTime: {
              dataType: {
                type: "timestamp",
              },
            },
            decimal: {
              dataType: {
                type: "decimal",
              },
            },
            integer: {
              dataType: {
                type: "integer",
              },
            },
            long: {
              dataType: {
                type: "long",
              },
            },
            short: {
              dataType: {
                type: "short",
              },
            },
            float: {
              dataType: {
                type: "float",
              },
            },
            double: {
              dataType: {
                type: "double",
              },
            },
            byte: {
              dataType: {
                type: "byte",
              },
            },
            attachment: {
              dataType: {
                type: "attachment",
              },
            },
            geoPoint: {
              dataType: {
                type: "geopoint",
              },
            },
            geoShape: {
              dataType: {
                type: "geoshape",
              },
            },
            stringArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "string",
                },
              },
            },
            booleanArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "boolean",
                },
              },
            },
            dateArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "date",
                },
              },
            },
            dateTimeArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "timestamp",
                },
              },
            },
            decimalArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "decimal",
                },
              },
            },
            integerArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "integer",
                },
              },
            },
            longArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "long",
                },
              },
            },
            shortArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "short",
                },
              },
            },
            floatArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "float",
                },
              },
            },
            doubleArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "double",
                },
              },
            },
            byteArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "byte",
                },
              },
            },
            attachmentArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "attachment",
                },
              },
            },
            geoPointArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "geopoint",
                },
              },
            },
            geoShapeArray: {
              dataType: {
                type: "array",
                subType: {
                  type: "geoshape",
                },
              },
            },
          },
        },
      },
      queryTypes: [],
      linkTypes: {
        Person: [{
          apiName: "Todos",
          cardinality: "MANY",
          displayName: "Todos",
          objectTypeApiName: "Todo",
          status: "ACTIVE",
          foreignKeyPropertyApiName: "id",
        }],
        Todo: [{
          apiName: "Assignee",
          cardinality: "ONE",
          displayName: "Assignee",
          objectTypeApiName: "Person",
          status: "ACTIVE",
          foreignKeyPropertyApiName: "email",
        }],
      },
    },
    {
      writeFile: (path, contents) => {
        return realFs.writeFile(path, contents, "utf-8");
      },
      mkdir: async (path, options) => {
        await realFs.mkdir(path, options);
      },
    },
    basePath,
  );
}
