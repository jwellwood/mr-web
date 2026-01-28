import { useQuery } from '@apollo/client';

import { AUTH_ROLES } from '../../../constants';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard';
import TeamView from '../components/TeamView';
import { FETCH_TEAM } from '../graphql';

export default function TeamOverview() {
  const { teamId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_TEAM, {
    variables: { teamId: teamId! },
  });

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <TeamView data={data} loading={loading} error={error} />
    </RouteGuard>
  );
}
