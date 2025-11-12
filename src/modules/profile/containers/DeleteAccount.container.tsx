import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_USER, DELETE_USER } from '../graphql';

import { pages } from '../constants';
import DeleteAccountForm from '../forms/DeleteAccount.form';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { resetAuth } from '../../../store/features/auth/authSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { Spinner } from '../../../components/loaders';
import { apolloClient } from '../../../services/graphql/apolloClient.ts';
import { AUTH } from '../../../router/routes/paths.ts';
import CustomAppBar from '../../../components/navigation/CustomAppBar.tsx';

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
        navigate(AUTH.SIGN_IN);
      })
      .catch(err => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
        console.error(err);
      });
  };

  const renderContent = () => {
    return !loading && !deleteLoading && data ? (
      <DeleteAccountForm
        onSubmit={onSubmit}
        defaultValues={{ username: '' }}
        username={data.user.username}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.USER}>
      <CustomAppBar title={pages.DELETE_ACCOUNT}>
        {error || deleteError ? (
          <ErrorGraphql error={(error || deleteError) as Error} />
        ) : (
          renderContent()
        )}
      </CustomAppBar>
    </RouteGuard>
  );
}
