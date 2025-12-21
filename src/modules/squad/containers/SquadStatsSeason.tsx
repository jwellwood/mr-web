import { useQuery } from '@apollo/client';

import { FETCH_SQUAD_STATS_SEASON } from '../graphql';
import { useCustomParams, useSeasons } from '../../../hooks';
import SquadStatsSeasonView from '../views/SquadStatsSeasonView';

export default function SquadStatsSeason() {
  const { teamId } = useCustomParams();
  const { seasonId, seasonEndDate } = useSeasons();

  const { loading, error, data } = useQuery(FETCH_SQUAD_STATS_SEASON, {
    variables: { teamId, seasonId },
    skip: !seasonId,
  });

  return (
    <SquadStatsSeasonView
      data={data}
      loading={loading}
      error={error}
      seasonEndDate={seasonEndDate || undefined}
    />
  );
}
