import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { client } from 'graphql/client';
import { showAlert } from 'modules/alerts';
import { setAuth } from 'modules/auth';
import { AUTH } from 'router/paths';
import RouteGuard from 'router/RouteGuard';
import { pages } from '../constants';
import DeleteAccountForm from '../forms/DeleteAccount.form';
import { GET_USER, DELETE_USER } from '../graphql';

const DeleteAccountContainer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery(GET_USER);
  const [deleteUser, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_USER, {
      refetchQueries: [{ query: GET_USER }],
    });

  const onSubmit = () => {
    return deleteUser()
      .then(() => {
        dispatch(showAlert('User account deleted successfully', 'success'));
        client.resetStore();
        dispatch(setAuth([], [], []));
        navigate(AUTH.SIGN_IN);
      })
      .catch((err) => {
        dispatch(showAlert('Something went wrong', 'error'));
        console.log(err);
      });
  };

  if (error) {
    return <ErrorGraphql error={[error, deleteError]} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.USER}>
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
