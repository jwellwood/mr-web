import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_PLAYER_STATS } from '../graphql';
import { useCustomParams } from '../../../hooks';
import { StatsFiltersContext, TFilters } from '../context';
import PlayerStatsView from '../views/PlayerStatsView';

export default function PlayerStats() {
  const [filters, setFilters] = useState<TFilters>({ seasons: 'all', competitions: 'all' });
  const { playerId } = useCustomParams();

  const { loading, data, error } = useQuery(FETCH_PLAYER_STATS, {
    variables: { playerId, seasonId: filters?.seasons, competitionId: filters?.competitions },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  return (
    <StatsFiltersContext.Provider value={{ filters, setFilters }}>
      <PlayerStatsView data={data} loading={loading} error={error} />
    </StatsFiltersContext.Provider>
  );
}
