import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useCustomParams } from '../../../hooks';
import { FETCH_PLAYER_OPPONENT_STATS } from '../graphql';
import PlayerOpponentStatsView from '../components/player-opponents/PlayerOpponentStatsView';
import { PlayerOpponentFiltersContext, TPlayerOpponentFilters } from '../context';

export default function PlayerOpponentStats() {
  const [filters, setFilters] = useState<TPlayerOpponentFilters>({
    showAverages: false,
    showAllOpponents: false,
  });
  const { playerId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_PLAYER_OPPONENT_STATS, {
    variables: { playerId: playerId!, showAll: filters.showAllOpponents },
  });

  return (
    <PlayerOpponentFiltersContext.Provider value={{ filters, setFilters }}>
      <PlayerOpponentStatsView data={data} loading={loading} error={error} />
    </PlayerOpponentFiltersContext.Provider>
  );
}
