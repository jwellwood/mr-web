import { useQuery } from '@apollo/client';

import { FETCH_MATCHES_STATS } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import MatchStatsSeasonView from '../views/MatchStatsSeasonView';

export default function MatchStatsSeason() {
  const { teamId } = useCustomParams();
  const { seasonId, seasonReady } = useSeasons();

  const { loading, error, data } = useQuery(FETCH_MATCHES_STATS, {
    skip: !seasonId,
    variables: { teamId, seasonId },
  });

  return (
    <MatchStatsSeasonView data={data} loading={loading} error={error} seasonReady={seasonReady} />
  );
}
