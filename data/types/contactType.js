import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { GraphQLString, GraphQLObjectType } from 'graphql';
import { nodeInterface } from '../nodes';

const contactType = new GraphQLObjectType({
  name: 'Contact',
  description: 'A contact in our app',
  fields: () => ({
    id: globalIdField('Contact'),
    firstName: {
      type: GraphQLString,
      description: 'The contact name',
    },
    lastName: {
      type: GraphQLString,
      description: 'The contact lastname',
    },
    email: {
      type: GraphQLString,
      description: 'The contact email',
    },
  }),
  interfaces: [nodeInterface],
});

const {
  connectionType: contactConnection,
  edgeType: ContactEdge,
} = connectionDefinitions({name: 'Contact', nodeType: contactType});

module.exports = { contactType, contactConnection, ContactEdge };
