import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { pages } from '../constants';
import ForgotPasswordForm from '../forms/ForgotPassword.form';
import { FORGOT_PASSWORD } from '../graphql';
import { IForgotPasswordInput } from '../types';
import { AppDispatch } from '../../../store/store';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { AUTH } from '../../../router/routes/paths.ts';
import { AuthRoles } from '../../../constants.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { Spinner } from '../../../components/loaders';
import AuthLayout from '../components/AuthLayout.tsx';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import { forgotPasswordFormState } from '../forms/state.ts';
import { PageHeader } from '../../../components';

export default function ForgotPasswordContainer() {
  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (formData: IForgotPasswordInput) => {
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

  const renderContent = () => {
    return !loading ? (
      <ForgotPasswordForm defaultValues={forgotPasswordFormState} onSubmit={onSubmit} />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.NONE}>
      <PageHeader title={pages.FORGOT_PASSWORD_PAGE}>
        <AuthLayout>{error ? <ErrorGraphql error={error} /> : renderContent()}</AuthLayout>
      </PageHeader>
    </RouteGuard>
  );
}
