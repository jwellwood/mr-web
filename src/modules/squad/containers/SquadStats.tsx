import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useCustomParams } from '../../../hooks';
import StatsView from '../components/squad-stats/StatsView';
import { SquadStatsFiltersContext, TFilters } from '../context/SquadStatsFiltersContext';
import { FETCH_SQUAD_STATS } from '../graphql';

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
