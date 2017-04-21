import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';

import {
  mutationWithClientMutationId,
  fromGlobalId,
  //cursorForObjectInConnection,
  offsetToCursor,
} from 'graphql-relay';

import {
  addContact,
  deleteAll,
  deleteOne,
  getContactById,
  getContacts,
  getContactIds,
  getNumContacts,
  updateContact
} from '../models/contactModel';

import { viewerType } from '../types/viewerType';
import { contactType, ContactEdge } from '../types/contactType';

/**
  * creates a new Contact and appends it to 'contacts' in the viewer
  *
  * This will return a GraphQLFieldConfig for our contact
  * mutation.
  *
  * It creates these two types implicitly:
  *   input AddContactInput {
  *     clientMutationId: string!
  *     firstName: string!
  *     lastName: string!
  *     email: string!
  *   }
  *
  *   input AddContactPayload {
  *     clientMutationId: string!
  *     newContactEdge: ContactEdge
  *     viewer: viewerType
  *   }
  */
const addContactMutation = mutationWithClientMutationId({
  name: 'AddContact',
  inputFields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    newContactEdge: {
      type: ContactEdge,
      resolve: async (payload) => {
        const contact = await getContactById(payload.contactId);
        const numContacts = await getNumContacts();

        let cursor = offsetToCursor(numContacts-1);
        return {
          cursor: cursor,
          node: contact,
        };
      },
    },
    viewer: {
      type: viewerType,
      resolve: async () => {
        //console.log('output viewer for add mutation');
        let ret = await getContactIds();
        //console.log(ret);
        return ret;
      },
    },
  },
  mutateAndGetPayload: async (args) => {
    console.log("addContactMutation getting payload");
    // must be async function
    // and await mongoose promise to resolve
    let newContact = await addContact(args.firstName, args.lastName, args.email);
    return {
      contactId: newContact.id,
    };
  },
});

/**
 * updates a Contact
 */
const updateContactMutation = mutationWithClientMutationId({
  name: 'UpdateContact',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    contact: {
      type: contactType,
      resolve: (payload) => payload.contact,
    },
  },
  mutateAndGetPayload: async ({id, firstName, lastName, email}) => {
    console.log('update getting payload');
    // this is where database-specific requests are made to the server;
    // graphql doesn't care what kind of database is actually on the server
    //
    // must be async function
    // and await mongoose promise to resolve
    let _id = fromGlobalId(id).id;
    return {
      contact: await updateContact(_id, firstName, lastName, email),
    };
  },
});

export default {
  updateContact: updateContactMutation,
  addContact: addContactMutation,
};
