import { GraphQLObjectType } from 'graphql';
import { nodeField } from '../nodes';
import contact from './contact';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    ...contact
  },
});
