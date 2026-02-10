import { GraphQLError } from 'graphql';

/**
 * Error type for Apollo Client queries and mutations
 * Compatible with Apollo Client v4+
 */
export interface TApolloError {
  message: string;
  graphQLErrors?: readonly GraphQLError[];
  networkError?: Error | null;
}
