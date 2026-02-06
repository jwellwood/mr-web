import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { PAGES } from '../../constants';
import { AppDispatch, showAlert } from '../../../../store';
import { PageContainer } from '../../../../components';
import { AUTH_PATHS } from '../../router';
import type { ForgotPasswordFormData } from './validation';
import ForgotPasswordView from './ForgotPasswordView';
import { Forgot_PasswordDocument } from '../../graphql/FORGOT_PASSWORD.generated';

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
