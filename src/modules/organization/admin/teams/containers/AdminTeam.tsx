import { useQuery } from '@apollo/client/react';
import { DataError, PageHeader } from '../../../../../components';
import { Spinner } from '../../../../../components/loaders';
import { useAuth } from '../../../../../hooks';
import { useCustomParams } from '../../../../../hooks/useCustomParams';
import { PAGES } from '../../../constants';
import TeamAdminView from '../components/TeamAdminView';
import { FETCH_TEAM_ADMIN_VIEW } from '../graphql';

export default function AdminTeam() {
  const { teamId, orgId } = useCustomParams();
  const { isOrgAuth } = useAuth(teamId, orgId);
  const { data, loading, error } = useQuery(FETCH_TEAM_ADMIN_VIEW, {
    variables: { teamId: teamId! },
  });

  const renderContent = () => {
    return !loading ? <TeamAdminView team={data?.team} /> : <Spinner />;
  };

  return (
    <PageHeader title={PAGES.TEAM_ADMIN} links={isOrgAuth ? [] : undefined}>
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
