import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import PlayerSeasonStatsView from '../views/PlayerSeasonStatsView';
import { FETCH_PLAYER_SEASON_STATS } from '../graphql';
import { useCustomParams, useSeasons } from '../../../hooks';

export default function PlayerSeasonStats() {
  const { seasonId } = useSeasons();
  const { playerId } = useCustomParams();

  const { loading, data, refetch, error } = useQuery(FETCH_PLAYER_SEASON_STATS, {
    variables: { seasonId, playerId },
    skip: !seasonId,
    refetchWritePolicy: 'overwrite',
  });

  useEffect(() => {
    if (seasonId) {
      refetch();
    }
  }, [playerId, refetch, seasonId]);

  return (
    <PlayerSeasonStatsView
      data={data}
      playerId={playerId as string}
      loading={loading}
      error={error}
    />
  );
}
