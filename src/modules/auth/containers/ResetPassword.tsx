import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { pages } from '../constants';
import ResetPassword from '../forms/ResetPassword.form';
import { RESET_PASSWORD } from '../graphql';
import { IResetPasswordInput } from '../types';
import { AppDispatch } from '../../../store/store';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { AUTH } from '../../../router/routes/paths.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AUTH_ROLES } from '../../../app/constants.ts';
import Spinner from '../../../components/loaders/Spinner.tsx';
import CustomAppBar from '../../../components/navigation/CustomAppBar.tsx';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import { resetPasswordFormState } from '../forms/state.ts';

export default function ResetPasswordContainer() {
  const { token } = useParams<{ token: string }>();

  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (formData: IResetPasswordInput) => {
    resetPassword({ variables: { password: formData.password, token } })
      .then(() => {
        dispatch(
          showAlert({
            text: 'Password has been reset! Use your new password to sign in',
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
      <ResetPassword defaultValues={resetPasswordFormState} onSubmit={onSubmit} />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.NONE}>
      <CustomAppBar title={pages.RESET_PASSWORD_PAGE}>
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </CustomAppBar>
    </RouteGuard>
  );
}
