import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { FETCH_TEAM_ADMIN_VIEW } from '../graphql';
import AdminTeamPage from '../pages/AdminTeamPage';

export default function AdminTeam() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_TEAM_ADMIN_VIEW, {
    variables: { teamId: teamId! },
  });

  return <AdminTeamPage data={data} loading={loading} error={error} />;
}
