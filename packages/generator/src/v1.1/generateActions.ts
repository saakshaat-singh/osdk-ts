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

import type { ActionParameterType } from "@osdk/gateway/types";
import type { MinimalFs } from "../MinimalFs";
import { getModifiedEntityTypes } from "../shared/getEditedEntities";
import { formatTs } from "../util/test/formatTs";
import type { WireOntologyDefinition } from "../WireOntologyDefinition";

export async function generateActions(
  ontology: WireOntologyDefinition,
  fs: MinimalFs,
  outDir: string,
) {
  const importedObjects = new Set<string>();
  let actionSignatures = [];
  for (const action of ontology.actionTypes) {
    const entries = Object.entries(action.parameters);

    const modifiedEntityTypes = getModifiedEntityTypes(action);
    const addedObjects = Array.from(modifiedEntityTypes.addedObjects);
    const modifiedObjects = Array.from(modifiedEntityTypes.modifiedObjects);
    addedObjects.forEach(importedObjects.add, importedObjects);
    modifiedObjects.forEach(importedObjects.add, importedObjects);

    let jsDocBlock = ["/**"];
    if (action.description) {
      jsDocBlock.push(`* ${action.description}`);
    }

    let parameterBlock = "";
    if (entries.length > 0) {
      parameterBlock = `params: { \n`;
      for (
        const [parameterName, parameterData] of entries
      ) {
        parameterBlock += `"${parameterName}"`;
        parameterBlock += parameterData.required ? ": " : "?: ";
        const getTypeScriptType = handleDataType(
          parameterData.dataType,
          importedObjects,
        );
        parameterBlock += `${getTypeScriptType};\n`;

        jsDocBlock.push(
          `* @param {${getTypeScriptType}} params.${parameterName}`,
        );
      }
      parameterBlock += "}, ";
    }

    jsDocBlock.push(`*/`);
    actionSignatures.push(
      `
      ${jsDocBlock.join("\n")}
      ${action.apiName}<O extends ActionExecutionOptions>(${parameterBlock}options?: O): 
        Promise<Result<ActionResponseFromOptions<O, Edits<${
        addedObjects.length > 0
          ? addedObjects.join(" | ")
          : "void"
      }, ${
        modifiedObjects.length > 0
          ? modifiedObjects.join(" | ")
          : "void"
      }>>, ActionError>>;`,
    );
  }

  await fs.writeFile(
    `${outDir}/ontologyActions.ts`,
    await formatTs(`
    import type { ObjectSet, LocalDate, Timestamp, Attachment, Edits, ActionExecutionOptions, ActionError, Result, ActionResponseFromOptions } from "@osdk/legacy-client";
    ${
      Array.from(importedObjects).map(importedObject =>
        `import type { ${importedObject} } from "./objects/${importedObject}";`
      ).join("\n")
    }
    export interface Actions {
    ${actionSignatures.join("\n")}
    }
  `),
  );
}

function handleDataType(
  actionParameter: ActionParameterType,
  importedObjects: Set<string>,
): string {
  switch (actionParameter.type) {
    case "objectSet": {
      const objectType = actionParameter.objectTypeApiName!;
      importedObjects.add(objectType);
      return `ObjectSet<${objectType}>`;
    }
    case "object": {
      const objectType = actionParameter.objectTypeApiName!;
      importedObjects.add(objectType);
      return `${objectType}`;
    }
    case "array":
      return handleDataType(actionParameter.subType, importedObjects) + `[]`;
    case "string":
      return `string`;
    case "boolean":
      return `boolean`;
    case "attachment":
      return `Attachment`;
    case "date":
      return `LocalDate`;
    case "double":
    case "integer":
    case "long":
      return `number`;
    case "timestamp":
      return `Timestamp`;
    default:
      const _: never = actionParameter;
      throw new Error(`Unsupported action parameter type: ${actionParameter}`);
  }
}
