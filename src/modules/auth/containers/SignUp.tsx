import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch, showAlert } from '../../../store';
import { SignUpFormData } from '../forms/sign-up/schema';
import { REGISTER_USER } from '../graphql';
import SignUpPage from '../pages/SignUpPage';

export default function SignUpContainer() {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onError: () => dispatch(showAlert({ text: t('ALERTS.RESEND_FAIL'), type: 'error' })),
  });
  const onSubmit = (formData: SignUpFormData) => {
    if (!turnstileToken) {
      dispatch(showAlert({ text: t('ALERTS.CAPTCHA'), type: 'warning' }));
      return;
    }
    return registerUser({ variables: { ...formData, turnstileToken } })
      .then(({ data }) => {
        if (data) {
          const { user } = data;
          dispatch(
            showAlert({ text: t('MESSAGES.WELCOME', { username: user.username }), type: 'success' })
          );
          setEmail(user.email);
        }
      })
      .catch(() => {
        dispatch(showAlert({ text: t('ALERTS.RESEND_FAIL'), type: 'error' }));
      });
  };

  return (
    <SignUpPage loading={loading} onSubmit={onSubmit} email={email} onToken={setTurnstileToken} />
  );
}
