import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import { showAlert } from 'modules/alerts';
import { PROFILE } from 'router/paths';
import RouteGuard from 'router/RouteGuard';
import { pages, changePasswordFormState } from '../constants';
import EditPasswordForm from '../forms/EditPassword.form';
import { EDIT_PASSWORD, GET_USER } from '../graphql';
import { IChangePasswordForm } from '../types';

const ChangePasswordContainer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editPassword, { loading }] = useMutation(EDIT_PASSWORD, {
    refetchQueries: [{ query: GET_USER }],
  });

  const onSubmit = async (data: IChangePasswordForm) => {
    return editPassword({
      variables: { password: data.password, newPassword: data.newPassword },
    })
      .then(() => {
        dispatch(showAlert('Password changed successfully!', 'success'));
        navigate(PROFILE.PROFILE);
      })
      .catch((err) => {
        console.log(err);
        dispatch(showAlert('Something went wrong, please try again', 'error'));
      });
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.USER}>
      <PageHeader title={pages.CHANGE_PASSWORD_PAGE} />
      {!loading ? (
        <EditPasswordForm
          onSubmit={onSubmit}
          defaultValues={changePasswordFormState}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default ChangePasswordContainer;
