import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PageContainer } from '../../../../components';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { REGISTER_USER } from '../../graphql';
import SignUpView from './SignUpView';
import type { SignUpFormData } from './validation';

export default function SignUpContainer() {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });

  const onSubmit = (formData: SignUpFormData) => {
    if (!turnstileToken) {
      dispatch(showAlert({ text: 'Please complete the CAPTCHA', type: 'warning' }));
      return;
    }
    return registerUser({ variables: { ...formData, turnstileToken } })
      .then(({ data }) => {
        if (data) {
          const { user } = data;
          dispatch(showAlert({ text: `Welcome ${user.username}!`, type: 'success' }));
          setEmail(user.email);
        }
      })
      .catch(err => {
        dispatch(showAlert({ text: err.message, type: 'error' }));
      });
  };

  return (
    <PageContainer title={PAGES.SIGN_UP_PAGE}>
      <SignUpView loading={loading} onSubmit={onSubmit} email={email} onToken={setTurnstileToken} />
    </PageContainer>
  );
}
