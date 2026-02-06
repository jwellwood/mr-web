import { useQuery } from '@apollo/client';

import { FETCH_SEASON } from '../graphql';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { PAGES, SEASON_ADMIN_LINKS } from '../constants';
import { PageHeader } from '../../../components';
import SeasonView from '../components/seasons/SeasonView';

export default function Season() {
  const { teamId, seasonId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { data, loading, error } = useQuery(FETCH_SEASON, {
    variables: { seasonId: seasonId! },
  });

  return (
    <PageHeader title={PAGES.SEASON} links={isTeamAuth ? SEASON_ADMIN_LINKS : undefined}>
      <SeasonView data={data} loading={loading} error={error} />
    </PageHeader>
  );
}
