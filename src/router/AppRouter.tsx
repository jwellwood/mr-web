import React, { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ROLES } from '../modules/auth/graphql';
import { useAuth } from '../hooks';
import { PageContainer } from '../components/containers';
import { Spinner } from '../components/loaders';
import AlertMessage from '../modules/alerts/components/AlertMessage.tsx';
import { resetAuth, setAuth } from '../store/features/auth/authSlice.ts';

const AppRoutes = lazy(() => import('./Routes'));

function AppRouter() {
  const dispatch = useDispatch();
  const { data, loading } = useQuery(GET_ROLES);
  const { isAuth } = useAuth('router');

  useEffect(() => {
    if (data && !loading) {
      dispatch(
        setAuth({
          roles: data.user?.roles,
          teamIds: data.user?.teamIds,
          orgIds: data?.user?.orgIds,
        })
      );
    } else {
      dispatch(resetAuth());
    }
  }, [data, dispatch, loading]);

  return (
    <BrowserRouter>
      <PageContainer>
        <React.Suspense fallback={<Spinner />}>
          {isAuth !== null && !loading && <AppRoutes />}
        </React.Suspense>
        <AlertMessage />
      </PageContainer>
    </BrowserRouter>
  );
}

export default AppRouter;
