import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_USER, DELETE_USER } from '../graphql';
import { PAGES } from '../constants.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { resetAuth } from '../../../store/features/auth/authSlice.ts';
import { AUTH_ROLES } from '../../../constants';
import { apolloClient } from '../../../services/graphql/apolloClient.ts';
import { PageContainer } from '../../../components/';
import { AUTH_PATHS } from '../../auth/router/';
import DeleteProfileView from '../views/DeleteProfileView.tsx';

export default function DeleteAccountContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery(FETCH_USER);
  const [deleteUser, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_USER);

  const onSubmit = async () => {
    return deleteUser()
      .then(async () => {
        dispatch(showAlert({ text: 'User account deleted successfully', type: 'success' }));
        await apolloClient.resetStore();
        dispatch(resetAuth());
        navigate(AUTH_PATHS.SIGN_IN);
      })
      .catch(err => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
        console.error(err);
      });
  };

  return (
    <PageContainer auth={AUTH_ROLES.USER} title={PAGES.DELETE_ACCOUNT}>
      <DeleteProfileView
        data={data}
        onSubmit={onSubmit}
        loading={loading || deleteLoading}
        error={error || deleteError}
      />
    </PageContainer>
  );
}
