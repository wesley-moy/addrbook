import {
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay';

import { ContactModel, getContact } from './models/contactModel';

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, _id} = fromGlobalId(globalId);
    switch(type) {
      case 'Contact': return getContact();
      default: return null;
    }
  },
  (obj) => {
    if (obj instanceof ContactModel) {
      return contactType;
    } else {
      return null;
    }
  }
);

module.exports = { nodeInterface, nodeField };
