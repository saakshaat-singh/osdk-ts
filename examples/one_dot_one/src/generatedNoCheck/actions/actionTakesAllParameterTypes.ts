import { ActionDefinition } from '@osdk/api';

export const actionTakesAllParameterTypes = {
  apiName: 'actionTakesAllParameterTypes',
  parameters: {
    objectSet: {
      multiplicity: false,
      type: {
        objectSet: 'Todo',
      },
      nullable: false,
    },
    object: {
      multiplicity: false,
      type: {
        object: 'Person',
      },
      nullable: true,
      description: 'A person Object',
    },
    string: {
      multiplicity: false,
      type: 'string',
      nullable: false,
    },
    'time-stamp': {
      multiplicity: false,
      type: 'timestamp',
      nullable: false,
    },
    dateArray: {
      multiplicity: true,
      type: 'datetime',
      nullable: true,
    },
    attachmentArray: {
      multiplicity: true,
      type: 'attachment',
      nullable: false,
    },
  },
  description: 'An action which takes different types of parameters',
  modifiedEntities: {
    Todo: {
      created: true,
      modified: true,
    },
    ObjectTypeWithAllPropertyTypes: {
      created: false,
      modified: true,
    },
  },
} satisfies ActionDefinition<'actionTakesAllParameterTypes', 'Todo' | 'ObjectTypeWithAllPropertyTypes' | 'Person'>;
