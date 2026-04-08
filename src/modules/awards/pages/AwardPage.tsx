import { useTranslation } from 'react-i18next';
import { DataError, PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { TApolloError } from '../../../types/apollo';
import AwardView from '../components/AwardView';
import { T_FETCH_AWARD } from '../graphql';
import { getAwardAdminLinks } from '../helpers/getAwardAdminLinks';

interface Props {
  data?: T_FETCH_AWARD;
  loading: boolean;
  error?: TApolloError;
}

export default function AwardPage({ data, loading, error }: Props) {
  const { t } = useTranslation('awards');
  const { teamId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const renderContent = () => (loading ? <Spinner /> : <AwardView data={data} loading={loading} />);

  return (
    <PageHeader title={t('PAGES.AWARD')} links={isTeamAuth ? getAwardAdminLinks(t) : undefined}>
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
