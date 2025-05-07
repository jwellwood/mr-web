import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import { AUTH } from 'router/paths';
import RouteGuard from 'router/RouteGuard';
import { FORGOT_PASSWORD_PAGE, forgotPasswordFormState } from '../constants';
import ForgotPasswordForm from '../forms/ForgotPassword.form';
import { FORGOT_PASSWORD } from '../graphql';
import { IForgotPasswordForm } from '../types';

const ForgotPasswordContainer: React.FC = () => {
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (formData: IForgotPasswordForm) => {
    forgotPassword({ variables: { email: formData.email } })
      .then(({ data }) => {
        dispatch(
          showAlert(
            `Password reset email sent to ${data.user?.email}`,
            'success'
          )
        );
        navigate(AUTH.SIGN_IN);
      })
      .catch((err) => {
        dispatch(showAlert(err.message, 'error'));
      });
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.NONE}>
      <PageHeader title={FORGOT_PASSWORD_PAGE} />
      {!loading ? (
        <ForgotPasswordForm
          defaultValues={forgotPasswordFormState}
          onSubmit={onSubmit}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default ForgotPasswordContainer;
