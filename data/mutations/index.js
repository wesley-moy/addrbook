import { GraphQLObjectType } from 'graphql';
import contact from './contact';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...contact
  },
});
