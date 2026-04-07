import { useTranslation } from 'react-i18next';
import { DataError, PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { TApolloError } from '../../../types/apollo';
import TeamAdminView from '../components/TeamAdminView';
import type { Fetch_Team_Admin_ViewQuery } from '../graphql/FETCH_TEAM_ADMIN_VIEW.generated';

interface Props {
  data: Fetch_Team_Admin_ViewQuery | undefined;
  loading: boolean;
  error?: TApolloError;
}

export default function AdminTeamPage({ data, loading, error }: Props) {
  const { t } = useTranslation('organization');
  const { teamId, orgId } = useCustomParams();
  const { isOrgAuth } = useAuth(teamId, orgId);

  const renderContent = () => {
    return !loading ? <TeamAdminView team={data?.team} /> : <Spinner />;
  };

  return (
    <PageHeader title={t('PAGES.TEAM_ADMIN')} links={isOrgAuth ? [] : undefined}>
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
