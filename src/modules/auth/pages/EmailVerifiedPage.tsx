import { useTranslation } from 'react-i18next';
import { MutationError, PageContainer } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import AuthLayout from '../components/AuthLayout';
import ValidatedEmail from '../components/ValidatedEmail.component';
import { T_VERIFY_EMAIL } from '../graphql';

interface Props {
  loading: boolean;
  error?: TApolloError;
  data?: T_VERIFY_EMAIL | null;
}

export default function VerifiedEmailPage({ loading, error, data }: Props) {
  const { t } = useTranslation('auth');

  return (
    <PageContainer title={t('PAGES.VALIDATED_EMAIL_PAGE')}>
      <AuthLayout>
        <>
          {error ? <MutationError error={error} /> : null}
          {loading ? <Spinner /> : <ValidatedEmail data={data} />}
        </>
      </AuthLayout>
    </PageContainer>
  );
}
