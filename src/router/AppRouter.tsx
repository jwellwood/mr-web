import { useQuery } from '@apollo/client/react';
import { lazy, useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CustomAlert } from '../components/alerts';
import { BackgroundContainer } from '../components/containers';
import { ErrorBoundary } from '../components/errors';
import { LazyLoader } from '../components/loaders';
import { TAuthRoles } from '../constants';
import { FETCH_USER } from '../modules/profile/graphql';
import { resetAuth, setAuth } from '../store';
import { authStorage } from '../utils';

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

function AppRouter() {
  const dispatch = useDispatch();
  const token = authStorage.getToken();

  // Fetch user data but don't block rendering
  const { data, error } = useQuery(FETCH_USER, {
    skip: !token,
    fetchPolicy: 'cache-first',
  });

  // Handle successful data (replaces deprecated onCompleted)
  useEffect(() => {
    if (data?.user) {
      dispatch(
        setAuth({
          roles: data.user.roles as TAuthRoles[],
          teamIds: data.user.teamIds,
          orgIds: data.user.orgIds,
          username: data.user.username,
        })
      );
    } else if (data && !data.user) {
      // Query returned but no user - clear auth
      dispatch(resetAuth());
    }
  }, [data, dispatch]);

  // Handle errors (replaces deprecated onError)
  useEffect(() => {
    if (error) {
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
          <AppContent />
          <CustomAlert />
        </BackgroundContainer>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default AppRouter;
