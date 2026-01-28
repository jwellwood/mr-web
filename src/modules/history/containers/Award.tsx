import { useQuery } from '@apollo/client';

import { FETCH_AWARD } from '../graphql';

import { AUTH_ROLES } from '../../../constants';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard';
import { AWARD_ADMIN_LINKS, PAGES } from '../constants';
import { PageHeader } from '../../../components';
import AwardView from '../components/awards/AwardView';

export default function Award() {
  const { teamId, awardId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { data, loading, error } = useQuery(FETCH_AWARD, {
    variables: { awardId: awardId! },
  });

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.AWARD} links={isTeamAuth ? AWARD_ADMIN_LINKS : undefined}>
        <AwardView data={data} loading={loading} error={error} />
      </PageHeader>
    </RouteGuard>
  );
}
