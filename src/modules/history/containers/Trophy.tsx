import { useQuery } from '@apollo/client';

import { FETCH_TROPHY } from '../graphql';
import { AUTH_ROLES } from '../../../constants';
import { PAGES, TROPHY_ADMIN_LINKS } from '../constants';
import { useAuth, useCustomParams } from '../../../hooks';
import RouteGuard from '../../../router/RouteGuard';
import { PageHeader } from '../../../components';
import TrophyView from '../views/TrophyView';

export default function Trophy() {
  const { teamId, trophyId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { data, loading, error } = useQuery(FETCH_TROPHY, {
    variables: { trophyId },
  });

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.TROPHY} links={isTeamAuth ? TROPHY_ADMIN_LINKS : undefined}>
        <TrophyView data={data} loading={loading} error={error} />
      </PageHeader>
    </RouteGuard>
  );
}
