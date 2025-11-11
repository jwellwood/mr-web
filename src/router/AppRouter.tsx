import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FETCH_ROLES } from '../modules/auth/graphql';
import { useAuth } from '../hooks';
import { PageContainer } from '../components/containers';
import AlertMessage from '../modules/alerts/components/AlertMessage.tsx';
import { resetAuth, setAuth } from '../store/features/auth/authSlice.ts';

const AppRoutes = lazy(() => import('./Routes'));

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
        })
      );
    } else {
      dispatch(resetAuth());
    }
  }, [data, dispatch, loading]);

  return (
    <BrowserRouter>
      <PageContainer>
        {isAuth !== null && !loading && <AppRoutes />}
        <AlertMessage />
      </PageContainer>
    </BrowserRouter>
  );
}

export default AppRouter;
