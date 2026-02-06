import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { FETCH_USER } from '../modules/profile/graphql';
import { useAuth } from '../hooks';
import { resetAuth, setAuth } from '../store';
import { CustomAlert, ErrorBoundary, BackgroundContainer } from '../components';
import { Spinner } from '../components/loaders';
import { TAuthRoles } from '../constants';
import { authStorage } from '../utils';

const AppRoutes = lazy(() => import('./routes/Routes'));

function AppRouter() {
  const dispatch = useDispatch();
  const token = authStorage.getToken();
  const { data, loading } = useQuery(FETCH_USER, {
    skip: !token,
  });
  const { isAuth } = useAuth();

  useEffect(() => {
    if (data?.user && !loading && token) {
      dispatch(
        setAuth({
          roles: data.user?.roles as TAuthRoles[],
          teamIds: data.user?.teamIds,
          orgIds: data.user?.orgIds,
          username: data.user.username,
        })
      );
    } else if (!loading) {
      dispatch(resetAuth());
    }
  }, [data, dispatch, loading, token]);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <BackgroundContainer>
          {isAuth !== null && !loading && (
            <Suspense fallback={<Spinner />}>
              <AppRoutes />
            </Suspense>
          )}
          <CustomAlert />
        </BackgroundContainer>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default AppRouter;
