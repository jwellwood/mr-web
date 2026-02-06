import { useQuery } from '@apollo/client';

import { FETCH_TROPHY } from '../graphql';
import { PAGES, TROPHY_ADMIN_LINKS } from '../constants';
import { useAuth, useCustomParams } from '../../../hooks';
import { PageHeader } from '../../../components';
import TrophyView from '../components/trophies/TrophyView';

export default function Trophy() {
  const { teamId, trophyId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { data, loading, error } = useQuery(FETCH_TROPHY, {
    variables: { trophyId: trophyId! },
  });

  return (
    <PageHeader title={PAGES.TROPHY} links={isTeamAuth ? TROPHY_ADMIN_LINKS : undefined}>
      <TrophyView data={data} loading={loading} error={error} />
    </PageHeader>
  );
}
