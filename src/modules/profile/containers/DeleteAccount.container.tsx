import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { pages } from '../constants';
import DeleteAccountForm from '../forms/DeleteAccount.form';
import { GET_USER, DELETE_USER } from '../graphql';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { resetAuth } from '../../../store/features/auth/authSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { PageHeader } from '../../../components/typography';
import { AuthRoles } from '../../../constants.ts';
import { Spinner } from '../../../components/loaders';
import { apolloClient } from '../../../services/graphql/apolloClient.ts';
import { AUTH } from '../../../router/paths.ts';

const DeleteAccountContainer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery(GET_USER);
  const [deleteUser, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USER }],
  });

  const onSubmit = () => {
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

  if (error || deleteError) {
    return <ErrorGraphql error={(error || deleteError) as Error} />;
  }

  return (
    <RouteGuard authorization={AuthRoles.USER}>
      <PageHeader title={pages.DELETE_ACCOUNT} />
      {!loading && !deleteLoading && data ? (
        <DeleteAccountForm
          onSubmit={onSubmit}
          defaultValues={{ username: '' }}
          username={data.user.username}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default DeleteAccountContainer;
