import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { authStorage } from '../../utils/storage';

const gqlUrl = import.meta.env.PROD
  ? import.meta.env.VITE_GRAPHQL_URL ||
    'https://madrid-reds-1035582858411.northamerica-northeast2.run.app/graphql'
  : 'http://localhost:3002/graphql';

const authLink = setContext((_, { headers }) => {
  const token = authStorage.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: gqlUrl,
  credentials: 'include',
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  clientAwareness: {
    name: 'football-stats',
    version: import.meta.env.VERSION,
  },
  devtools: { enabled: import.meta.env.DEV },
});
