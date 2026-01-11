import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useAuth } from '../hooks';
import { resetAuth, setAuth } from '../store/features/auth/authSlice.ts';
import { BackgroundContainer } from '../components/containers';
import CustomAlert from '../components/alerts/custom-alert/CustomAlert.tsx';
import { ErrorBoundary } from '../components/index.ts';
import { FETCH_ROLES } from '../modules/auth/graphql/FETCH_ROLES.ts';

const AppRoutes = lazy(() => import('./routes/Routes'));

function AppRouter() {
  const dispatch = useDispatch();
  const { data, loading } = useQuery(FETCH_ROLES);
  const { isAuth } = useAuth();

  useEffect(() => {
    if (data?.user && !loading) {
      dispatch(
        setAuth({
          roles: data.user?.roles,
          teamIds: data.user?.teamIds,
          orgIds: data.user?.orgIds,
          username: data.user.username,
        })
      );
    } else {
      dispatch(resetAuth());
    }
  }, [data, dispatch, loading]);

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
