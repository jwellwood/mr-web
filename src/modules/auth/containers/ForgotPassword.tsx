import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { FORGOT_PASSWORD_PAGE, forgotPasswordFormState } from '../constants';
import ForgotPasswordForm from '../forms/ForgotPassword.form';
import { FORGOT_PASSWORD } from '../graphql';
import { IForgotPasswordForm } from '../types';
import { AppDispatch } from '../../../store/store';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { AUTH } from '../../../router/paths.ts';
import { AuthRoles } from '../../../constants.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { PageHeader } from '../../../components/typography';
import { Spinner } from '../../../components/loaders';

const ForgotPasswordContainer: React.FC = () => {
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (formData: IForgotPasswordForm) => {
    forgotPassword({ variables: { email: formData.email } })
      .then(({ data }) => {
        dispatch(
          showAlert({
            text: `Password reset email sent to ${data?.user?.email}`,
            type: 'success',
          })
        );
        navigate(AUTH.SIGN_IN);
      })
      .catch(err => {
        dispatch(showAlert({ text: err.message, type: 'error' }));
      });
  };

  return (
    <RouteGuard authorization={AuthRoles.NONE}>
      <PageHeader title={FORGOT_PASSWORD_PAGE} />
      {!loading ? (
        <ForgotPasswordForm defaultValues={forgotPasswordFormState} onSubmit={onSubmit} />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default ForgotPasswordContainer;
