import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';

import { apolloClient } from './services/graphql/apolloClient';
import { store } from './store/store';
import { theme } from './theme';
import ErrorBoundary from './errors/ErrorBoundary';
import AppRouter from './router/AppRouter';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </ApolloProvider>
);
