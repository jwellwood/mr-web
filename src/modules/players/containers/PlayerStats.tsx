import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useCustomParams } from '../../../hooks';
import PlayerStatsView from '../components/player-stats/PlayerStatsView';
import { PlayerStatsFiltersContext, TFilters } from '../context';
import { FETCH_PLAYER_STATS } from '../graphql';

export default function PlayerStats() {
  const [filters, setFilters] = useState<TFilters>({ seasons: 'all', competitions: 'all' });
  const { playerId } = useCustomParams();

  const { loading, data, error } = useQuery(FETCH_PLAYER_STATS, {
    variables: {
      playerId: playerId!,
      seasonId: filters?.seasons,
      competitionId: filters?.competitions,
    },
    fetchPolicy: 'network-only',
  });

  return (
    <PlayerStatsFiltersContext.Provider value={{ filters, setFilters }}>
      <PlayerStatsView data={data} loading={loading} error={error} />
    </PlayerStatsFiltersContext.Provider>
  );
}
