import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { FETCH_USER } from '../modules/profile/graphql';
import { useAuth } from '../hooks';
import { resetAuth, setAuth } from '../store';
import { CustomAlert, ErrorBoundary, BackgroundContainer } from '../components';
import { TAuthRoles } from '../constants';

const AppRoutes = lazy(() => import('./routes/Routes'));

function AppRouter() {
  const dispatch = useDispatch();
  const { data, loading } = useQuery(FETCH_USER);
  const { isAuth } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (data?.user) {
        dispatch(
          setAuth({
            roles: data.user?.roles as TAuthRoles[],
            teamIds: data.user?.teamIds,
            orgIds: data.user?.orgIds,
            username: data.user.username,
          })
        );
      } else {
        dispatch(resetAuth());
      }
    }
  }, [data, dispatch, loading, isAuth]);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <BackgroundContainer>
          {isAuth !== null && !loading && <AppRoutes />}
          <CustomAlert />
        </BackgroundContainer>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default AppRouter;
