import { useMutation } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../../../components';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { Forgot_PasswordDocument } from '../../graphql/FORGOT_PASSWORD.generated';
import { AUTH_PATHS } from '../../router';
import ForgotPasswordView from './ForgotPasswordView';
import type { ForgotPasswordFormData } from './validation';

export default function ForgotPasswordContainer() {
  const [forgotPassword, { loading, error }] = useMutation(Forgot_PasswordDocument);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (formData: ForgotPasswordFormData) => {
    forgotPassword({ variables: { email: formData.email } })
      .then(({ data }) => {
        dispatch(
          showAlert({
            text: `Password reset email sent to ${data?.user?.email}`,
            type: 'success',
          })
        );
        navigate(AUTH_PATHS.SIGN_IN);
      })
      .catch(err => {
        dispatch(showAlert({ text: err.message, type: 'error' }));
      });
  };

  return (
    <PageContainer title={PAGES.FORGOT_PASSWORD_PAGE}>
      <ForgotPasswordView onSubmit={onSubmit} loading={loading} error={error} />
    </PageContainer>
  );
}
