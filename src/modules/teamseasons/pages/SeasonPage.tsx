import { useTranslation } from 'react-i18next';
import { DataError, PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { TApolloError } from '../../../types/apollo';
import SeasonView from '../components/SeasonView';
import { T_FETCH_SEASON } from '../graphql';
import { getSeasonAdminLinks } from '../helpers/getSeasonAdminLinks';

interface Props {
  data?: T_FETCH_SEASON;
  loading: boolean;
  error?: TApolloError;
}

export default function SeasonPage({ data, loading, error }: Props) {
  const { t } = useTranslation('teamseasons');
  const { teamId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const renderContent = () => (loading ? <Spinner /> : <SeasonView season={data?.season} />);

  return (
    <PageHeader title={t('PAGES.SEASON')} links={isTeamAuth ? getSeasonAdminLinks(t) : undefined}>
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
