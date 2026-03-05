import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CustomButton, MutationError } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { AppDispatch, showAlert } from '../../../store';
import { PROFILE_PATHS } from '../../profile/router';
import TurnstileWidget from '../components/Turnstile';
import { RESEND_VERIFICATION_EMAIL } from '../graphql';

interface Props {
  email: string | null;
}

export default function ResendVerification({ email }: Props) {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [resendVerificationEmail, { loading, error }] = useMutation(RESEND_VERIFICATION_EMAIL);

  const onSubmit = () => {
    if (!turnstileToken) {
      dispatch(showAlert({ text: 'Please complete the CAPTCHA', type: 'warning' }));
      return;
    }
    if (!email) return;
    resendVerificationEmail({ variables: { email, turnstileToken } })
      .then(() => {
        dispatch(showAlert({ text: `Email sent to ${email}`, type: 'success' }));
        navigate(PROFILE_PATHS.PROFILE);
      })
      .catch((err: Error) => {
        console.error(err);
        dispatch(showAlert({ text: 'Failed to resend verification email', type: 'error' }));
      });
  };

  return (
    <div style={{ margin: '16px' }}>
      {error ? <MutationError error={error} /> : null}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <CustomButton onClick={onSubmit} color="info">
            Resend Verification Link
          </CustomButton>
          <TurnstileWidget onVerify={setTurnstileToken} />
        </>
      )}
    </div>
  );
}
