import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../../../components';
import { AppDispatch, showAlert } from '../../../../store';
import TurnstileWidget from '../../components/Turnstile';
import { PAGES } from '../../constants';
import { FORGOT_PASSWORD } from '../../graphql';
import { AUTH_PATHS } from '../../router';
import ForgotPasswordView from './ForgotPasswordView';
import type { ForgotPasswordFormData } from './validation';

export default function ForgotPasswordContainer() {
  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (formData: ForgotPasswordFormData) => {
    if (!turnstileToken) {
      dispatch(showAlert({ text: 'Please complete the CAPTCHA', type: 'warning' }));
      return;
    }
    forgotPassword({ variables: { email: formData.email, turnstileToken } })
      .then(() => {
        dispatch(
          showAlert({
            text: `Password reset email sent to ${formData.email}`,
            type: 'success',
          })
        );
        navigate(AUTH_PATHS.SIGN_IN);
      })
      .catch(() => {
        dispatch({
          text: `Password reset email sent to ${formData.email}`,
          type: 'success',
        });
      });
  };

  return (
    <PageContainer title={PAGES.FORGOT_PASSWORD_PAGE}>
      <>
        <ForgotPasswordView
          onSubmit={onSubmit}
          loading={loading || !turnstileToken}
          error={error}
        />
        <TurnstileWidget onVerify={setTurnstileToken} />
      </>
    </PageContainer>
  );
}
