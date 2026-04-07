import { useTranslation } from 'react-i18next';
import { DataError, PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { TApolloError } from '../../../types/apollo';
import CompetitionDetails from '../components/CompetitionDetails';
import { T_FETCH_COMPETITION } from '../graphql';
import { getCompetitionAdminLinks } from '../helpers/getCompetitionAdminLinks';

interface Props {
  data?: T_FETCH_COMPETITION;
  loading: boolean;
  error?: TApolloError;
}

export default function CompetitonPage({ data, loading, error }: Props) {
  const { t } = useTranslation('competitions');
  const { teamId, orgId } = useCustomParams();
  const { isOrgAuth } = useAuth(teamId, orgId);

  const renderContent = () => {
    return !loading ? <CompetitionDetails competition={data?.competition} /> : <Spinner />;
  };

  return (
    <PageHeader
      title={t('PAGES.COMPETITION')}
      links={isOrgAuth ? getCompetitionAdminLinks(t) : undefined}
    >
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
