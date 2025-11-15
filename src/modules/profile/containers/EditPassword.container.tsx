import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { EDIT_PASSWORD, FETCH_USER } from '../graphql';

import { pages } from '../constants';
import EditPasswordForm from '../forms/EditPassword.form';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { PROFILE } from '../../../router/routes/paths.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { Spinner } from '../../../components/loaders';
import { AuthRoles } from '../../../constants.ts';
import { IChangePasswordInput } from '../types.ts';
import { changePasswordFormState } from '../forms/state.ts';
import { PageHeader } from '../../../components';

const ChangePasswordContainer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editPassword, { loading }] = useMutation(EDIT_PASSWORD, {
    refetchQueries: [{ query: FETCH_USER }],
  });

  const onSubmit = async (data: IChangePasswordInput) => {
    return editPassword({
      variables: { password: data.password, newPassword: data.newPassword },
    })
      .then(() => {
        dispatch(showAlert({ text: 'Password changed successfully!', type: 'success' }));
        navigate(PROFILE.PROFILE);
      })
      .catch(err => {
        console.error(err);
        dispatch(showAlert({ text: 'Something went wrong, please try again', type: 'error' }));
      });
  };

  return (
    <RouteGuard authorization={AuthRoles.USER}>
      <PageHeader title={pages.CHANGE_PASSWORD_PAGE}>
        {!loading ? (
          <EditPasswordForm onSubmit={onSubmit} defaultValues={changePasswordFormState} />
        ) : (
          <Spinner />
        )}
      </PageHeader>
    </RouteGuard>
  );
};

export default ChangePasswordContainer;
