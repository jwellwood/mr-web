import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { authStorage } from '../../utils/storage';

const gqlUrl = import.meta.env.PROD
  ? import.meta.env.VITE_GRAPHQL_URL ||
    'https://madrid-reds-1035582858411.northamerica-northeast2.run.app/graphql'
  : 'http://localhost:3002/graphql';

const httpLink = createHttpLink({
  uri: gqlUrl,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = authStorage.getToken();
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
  cache: new InMemoryCache(),

  link: authLink.concat(httpLink).concat(uploadLink),
});
