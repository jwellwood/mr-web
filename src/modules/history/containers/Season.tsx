import { useQuery } from '@apollo/client';

import { FETCH_SEASON } from '../graphql';
import { AUTH_ROLES } from '../../../constants';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard';
import { PAGES, SEASON_ADMIN_LINKS } from '../constants';
import { PageHeader } from '../../../components';
import SeasonView from '../views/SeasonView';

export default function Season() {
  const { teamId, seasonId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { data, loading, error } = useQuery(FETCH_SEASON, {
    variables: { seasonId },
  });

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.SEASON} links={isTeamAuth ? SEASON_ADMIN_LINKS : undefined}>
        <SeasonView data={data} loading={loading} error={error} />
      </PageHeader>
    </RouteGuard>
  );
}
