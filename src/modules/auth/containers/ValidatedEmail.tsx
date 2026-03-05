import { useMutation } from '@apollo/client/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MutationError, PageContainer } from '../../../components';
import { Spinner } from '../../../components/loaders';
import ValidatedEmail from '../components/ValidatedEmail.component';
import { PAGES } from '../constants';
import { VERIFY_EMAIL } from '../graphql';

export default function ValidatedEmailContainer() {
  const { token } = useParams<{ token: string }>();

  const [verifyEmail, { loading, error, data }] = useMutation(VERIFY_EMAIL);

  useEffect(() => {
    if (token) {
      verifyEmail({ variables: { token } });
    }
  }, [token, verifyEmail]);

  return loading ? (
    <Spinner />
  ) : (
    <PageContainer title={PAGES.VALIDATED_EMAIL_PAGE}>
      <>
        {error ? <MutationError error={error} /> : null}
        {loading ? <Spinner /> : <ValidatedEmail data={data} error={error} />}
      </>
    </PageContainer>
  );
}
