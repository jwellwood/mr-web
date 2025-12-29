import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_PLAYER_ALL_TIME_STATS } from '../graphql';
import PlayerAllTimeStatsView from '../views/PlayerAllTimeStatsView';
import { useCustomParams } from '../../../hooks';

export default function PlayerAllTimeStats() {
  const { playerId } = useCustomParams();

  const { loading, data, error, refetch } = useQuery(FETCH_PLAYER_ALL_TIME_STATS, {
    variables: { playerId },
  });

  useEffect(() => {
    refetch();
  }, [playerId, refetch]);

  return <PlayerAllTimeStatsView data={data} loading={loading} error={error} />;
}
