import { useQuery } from '@apollo/client';
import { useCustomParams } from '../../../hooks';
import { FETCH_PLAYER_OPPONENT_STATS } from '../graphql';
import PlayerOpponentStatsView from '../views/PlayerOpponentStatsView';

export default function PlayerOpponentStats() {
  const { playerId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_PLAYER_OPPONENT_STATS, {
    variables: { playerId },
  });

  return <PlayerOpponentStatsView data={data} loading={loading} error={error} />;
}
