import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_SQUAD_STATS } from '../graphql';
import { useCustomParams } from '../../../hooks';
import { SquadStatsFiltersContext, TFilters } from '../context/SquadStatsFiltersContext';
import StatsView from '../components/squad-stats/StatsView';

export default function SquadStats() {
  const { teamId } = useCustomParams();

  const [filters, setFilters] = useState<TFilters>({ seasons: 'all', competitions: 'all' });

  const { loading, error, data } = useQuery(FETCH_SQUAD_STATS, {
    variables: {
      teamId: teamId!,
      seasonId: filters?.seasons,
      competitionId: filters?.competitions,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  return (
    <SquadStatsFiltersContext.Provider value={{ filters, setFilters }}>
      <StatsView data={data} loading={loading} error={error} filters={filters} />
    </SquadStatsFiltersContext.Provider>
  );
}
