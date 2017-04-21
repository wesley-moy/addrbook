import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import queries from './queries';
import mutations from './mutations';

export const Schema = new GraphQLSchema({
  query: queries,
  mutation: mutations
});
