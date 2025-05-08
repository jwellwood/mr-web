import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { RESET_PASSWORD_PAGE, resetPasswordFormState } from '../constants';
import ResetPassword from '../forms/ResetPassword.form';
import { RESET_PASSWORD } from '../graphql';
import { IResetPasswordForm } from '../types';
import { AppDispatch } from '../../../store/store';
import {showAlert} from "../../../store/features/alerts/alertsSlice.ts";
import {AUTH} from "../../../router/paths.ts";
import RouteGuard from "../../../router/RouteGuard.tsx";
import {AUTH_ROLES} from "../../../app/constants.ts";
import {PageHeader} from "../../../components/typography";
import Spinner from '../../../components/loaders/Spinner.tsx';

const ResetPasswordContainer: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (formData: IResetPasswordForm) => {
    resetPassword({ variables: { password: formData.password, token } })
      .then(() => {
        dispatch(
          showAlert({

           text: 'Password has been reset! Use your new password to sign in',
            type: 'success'
          })
        );
        navigate(AUTH.SIGN_IN);
      })
      .catch((err) => {
        dispatch(showAlert({text: err.message, type: 'error'}));
      });
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.NONE}>
      <PageHeader title={RESET_PASSWORD_PAGE} />
      {!loading ? (
        <ResetPassword
          defaultValues={resetPasswordFormState}
          onSubmit={onSubmit}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default ResetPasswordContainer;
