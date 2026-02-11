import { ApolloProvider } from '@apollo/client/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ErrorBoundary } from './components/errors';
import AppRouter from './router/AppRouter';
import { apolloClient } from './services/graphql/apolloClient';
import { store } from './store';
import { theme } from './theme';

const container = document.getElementById('root');
const root = createRoot(container!);

const App = (
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

root.render(import.meta.env.DEV ? <StrictMode>{App}</StrictMode> : App);
