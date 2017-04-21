import {
  globalIdField,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay';

import { GraphQLObjectType } from 'graphql';
import { nodeInterface } from '../nodes';
import { contactConnection } from './contactType';
import { getContactById } from '../models/contactModel';

/**
 * We define our basic viewer type.
 *
 * This implements the following type system shorthand:
 *   type Viewer : Node {
 *     id: String!
 *     contacts: contactConnection
 *   }
 */
const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Global node wrapper type',
  fields: {
    id: globalIdField('Viewer'),
    contacts: {
      type: contactConnection,
      description: 'The list of contacts in the app',
      args: connectionArgs,
      resolve: (contacts, args) => {
        let ret = connectionFromArray(
          contacts.map(async ({id}) => await getContactById(id)),
          args
        );
        return ret;
      },
    },
  },
  interfaces: [nodeInterface],
});

module.exports = { viewerType };
