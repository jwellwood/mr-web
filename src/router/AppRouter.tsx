import { CombinedGraphQLErrors, ServerError } from '@apollo/client/errors';
import { useQuery } from '@apollo/client/react';
import { lazy, useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CustomSnackbar } from '../components/alerts';
import { BackgroundContainer } from '../components/containers';
import { ErrorBoundary } from '../components/errors';
import { LazyLoader } from '../components/loaders';
import { FETCH_USER } from '../modules/profile/graphql';
import { authPayloadFromUser, resetAuth, setAuth } from '../store';
import { authStorage } from '../utils';
import { AuthBootstrapContext } from './AuthBootstrapContext';

// Lazy load routes with retry logic for chunk load errors
const AppRoutes = lazy(() =>
  import('./routes/Routes').catch(error => {
    // If chunk loading fails (e.g., after deployment), reload the page
    if (error?.message?.includes('Failed to fetch') || error?.message?.includes('Importing')) {
      window.location.reload();
    }
    throw error;
  })
);

function AppContent() {
  return (
    <Suspense fallback={<LazyLoader fullHeight />}>
      <AppRoutes />
    </Suspense>
  );
}

const isAuthenticationError = (error: unknown) =>
  (CombinedGraphQLErrors.is(error) &&
    error.errors.some(graphQLError => graphQLError.extensions?.code === 'UNAUTHENTICATED')) ||
  (ServerError.is(error) && error.statusCode === 401);

function AppRouter() {
  const dispatch = useDispatch();
  const token = authStorage.getToken();

  // Fetch user data but don't block rendering
  const { data, error, loading, refetch } = useQuery(FETCH_USER, {
    skip: !token,
    fetchPolicy: 'cache-first',
  });

  // Handle successful data (replaces deprecated onCompleted)
  useEffect(() => {
    if (data?.user) {
      dispatch(setAuth(authPayloadFromUser(data.user)));
    } else if (data && !data.user) {
      // Query returned but no user - clear auth
      dispatch(resetAuth());
    }
  }, [data, dispatch]);

  // Only discard credentials when the server confirms they are invalid.
  useEffect(() => {
    if (error && isAuthenticationError(error)) {
      dispatch(resetAuth());
      authStorage.removeToken();
    }
  }, [error, dispatch]);

  // Initialize auth state if no token
  useEffect(() => {
    if (!token) {
      dispatch(resetAuth());
    }
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <BackgroundContainer>
          <AuthBootstrapContext.Provider
            value={{
              hasRetryableError: Boolean(error && !loading && !isAuthenticationError(error)),
              retry: () => {
                void refetch();
              },
            }}
          >
            <AppContent />
          </AuthBootstrapContext.Provider>
          <CustomSnackbar />
        </BackgroundContainer>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default AppRouter;
