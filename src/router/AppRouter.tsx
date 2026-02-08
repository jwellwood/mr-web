import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { FETCH_USER } from '../modules/profile/graphql';
import { resetAuth, setAuth } from '../store';
import { CustomAlert, ErrorBoundary, BackgroundContainer } from '../components';
import { TAuthRoles } from '../constants';
import { authStorage } from '../utils';

const AppRoutes = lazy(() => import('./routes/Routes'));

function AppContent() {
  return <AppRoutes />;
}

function AppRouter() {
  const dispatch = useDispatch();
  const token = authStorage.getToken();

  // Fetch user data but don't block rendering
  const { loading } = useQuery(FETCH_USER, {
    skip: !token,
    fetchPolicy: 'cache-first',
    onCompleted: data => {
      if (data?.user && token) {
        dispatch(
          setAuth({
            roles: data.user.roles as TAuthRoles[],
            teamIds: data.user.teamIds,
            orgIds: data.user.orgIds,
            username: data.user.username,
          })
        );
      } else {
        // User query completed but no user data - clear auth
        dispatch(resetAuth());
      }
    },
    onError: () => {
      // Clear auth state and token on error
      dispatch(resetAuth());
      authStorage.removeToken();
    },
  });

  // Initialize auth state immediately if no token
  useEffect(() => {
    if (!token && !loading) {
      dispatch(resetAuth());
    }
  }, [token, loading, dispatch]);

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
