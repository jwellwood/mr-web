import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, showAlert } from '../../../store';
import { ForgotPasswordFormData } from '../forms/forgot-password/schema';
import { FORGOT_PASSWORD } from '../graphql';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import { AUTH_PATHS } from '../router';

export default function ForgotPasswordContainer() {
  const { t } = useTranslation('auth');
  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (formData: ForgotPasswordFormData) => {
    if (!turnstileToken) {
      dispatch(showAlert({ text: t('ALERTS.CAPTCHA'), type: 'warning' }));
      return;
    }
    forgotPassword({ variables: { email: formData.email, turnstileToken } })
      .then(() => {
        dispatch(
          showAlert({
            text: t('ALERTS.RESEND_SUCCESS', { email: formData.email }),
            type: 'success',
          })
        );
        navigate(AUTH_PATHS.SIGN_IN);
      })
      .catch(() => {
        dispatch(
          showAlert({
            text: t('ALERTS.RESEND_FAIL'),
            type: 'error',
          })
        );
      });
  };

  return (
    <ForgotPasswordPage
      onSubmit={onSubmit}
      loading={loading || !turnstileToken}
      error={error}
      setTurnstileToken={setTurnstileToken}
    />
  );
}
