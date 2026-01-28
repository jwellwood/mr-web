import { useQuery } from '@apollo/client';

import { FETCH_MATCHES_STATS } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import MatchStatsSeasonView from '../components/matches-stats/MatchStatsSeasonView';

export default function MatchStatsSeason() {
  const { teamId } = useCustomParams();
  const { seasonId, seasonReady, loading: seasonLoading } = useSeasons();

  const { loading, error, data } = useQuery(FETCH_MATCHES_STATS, {
    skip: !seasonId,
    variables: { teamId: teamId!, seasonId: seasonId! },
  });

  return (
    <MatchStatsSeasonView
      data={data}
      loading={loading || seasonLoading}
      error={error}
      seasonReady={seasonReady}
    />
  );
}
