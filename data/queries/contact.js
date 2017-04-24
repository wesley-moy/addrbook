import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import {
  globalIdField,
  fromGlobalId,
} from 'graphql-relay';
import { contactType } from '../types/contactType';
import { viewerType } from '../types/viewerType';
import { getContactById, getContacts, getContactIds } from '../models/contactModel';

const single = {
  type: contactType,
  args: {
    id: { type: GraphQLString, },
  },
  resolve: async (root, {id}) => {
    // must be async function
    // and await mongoose promise to resolve
    // console.log(fromGlobalId(id));
    return await getContactById(fromGlobalId(id).id);
  }
};

/**
 * gets list of contacts
 * query { contacts }
 */
const multiple = {
  type: viewerType,
  resolve: async () => {
    return await getContactIds();
  },
};

export default {
  contact: single,
  contacts: multiple,
}
