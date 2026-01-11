import { useQuery } from '@apollo/client';

import { FETCH_MATCH } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import MatchView from '../views/MatchView';
import RouteGuard from '../../../router/RouteGuard';
import { AUTH_ROLES } from '../../../constants';
import { PageHeader } from '../../../components';
import { MATCH_ADMIN_LINKS, PAGES } from '../constants';
import { useAuth } from '../../../hooks';

export default function Match() {
  const { teamId, matchId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { data, loading, error } = useQuery(FETCH_MATCH, {
    variables: { matchId },
  });

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.MATCH} links={isTeamAuth ? MATCH_ADMIN_LINKS : undefined}>
        <MatchView data={data} loading={loading} error={error} />
      </PageHeader>
    </RouteGuard>
  );
}
