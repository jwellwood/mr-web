import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { FORGOT_PASSWORD } from '../../graphql';
import { PAGES } from '../../constants';
import { AppDispatch, showAlert } from '../../../../store';
import { AUTH_ROLES } from '../../../../constants';
import { PageContainer } from '../../../../components';
import { AUTH_PATHS } from '../../router';
import type { ForgotPasswordFormData } from './validation';
import ForgotPasswordView from './ForgotPasswordView';

export default function ForgotPasswordContainer() {
  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD);
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
    <PageContainer auth={AUTH_ROLES.NONE} title={PAGES.FORGOT_PASSWORD_PAGE}>
      <ForgotPasswordView onSubmit={onSubmit} loading={loading} error={error} />
    </PageContainer>
  );
}
