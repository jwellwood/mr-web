import { useMutation } from '@apollo/client/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VERIFY_EMAIL } from '../graphql';
import VerifiedEmailPage from '../pages/EmailVerifiedPage';

export default function ValidatedEmailContainer() {
  const { token } = useParams<{ token: string }>();

  const [verifyEmail, { loading, error, data }] = useMutation(VERIFY_EMAIL);

  useEffect(() => {
    if (token) {
      verifyEmail({ variables: { token } });
    }
  }, [token, verifyEmail]);

  return <VerifiedEmailPage loading={loading} error={error} data={data} />;
}
