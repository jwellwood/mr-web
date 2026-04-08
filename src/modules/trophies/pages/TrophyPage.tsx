import { useTranslation } from 'react-i18next';
import { DataError, PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { TApolloError } from '../../../types/apollo';
import TrophyView from '../components/TrophyView';
import { T_FETCH_TROPHY } from '../graphql';
import { getTrophyAdminLinks } from '../helpers/getTrophyAdminLinks';

interface Props {
  data?: T_FETCH_TROPHY;
  loading: boolean;
  error?: TApolloError;
}

export default function TrophyPage({ data, loading, error }: Props) {
  const { t } = useTranslation('trophies');
  const { teamId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const renderContent = () =>
    loading ? <Spinner /> : <TrophyView data={data} loading={loading} />;

  return (
    <PageHeader title={t('PAGES.TROPHY')} links={isTeamAuth ? getTrophyAdminLinks(t) : undefined}>
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
