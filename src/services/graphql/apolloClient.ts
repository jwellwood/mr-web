import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const gqlUrl = import.meta.env.PROD
  ? 'https://madrid-reds-1035582858411.northamerica-northeast2.run.app/graphql'
  : 'http://localhost:3002/graphql';

const httpLink = createHttpLink({
  uri: gqlUrl,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const uploadLink = createUploadLink({
  uri: gqlUrl,
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          matchesBySeason: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: ['seasonId', 'teamId'],
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing, incoming, { args }) {
              // Slicing is necessary because the existing data is
              //  immutable and frozen in development.
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[(args?.offset || 0) + i] = incoming[i];
              }
              return merged;
            },
          },
        },
      },
    },
  }),

  link: authLink.concat(httpLink).concat(uploadLink),
});
