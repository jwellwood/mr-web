import { useQuery } from '@apollo/client/react';
import React, { useState } from 'react';
import { useCustomParams } from '../../../hooks';
import StatsView from '../components/squad-stats/StatsView';
import { SquadStatsFiltersContext, TFilters } from '../context/SquadStatsFiltersContext';
import { FETCH_SQUAD_STATS } from '../graphql';

export default function SquadStats() {
  const { teamId } = useCustomParams();

  const [filters, setFilters] = useState<TFilters>({ seasons: 'all', competitions: 'all' });
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('apps');

  const { loading, error, data, previousData } = useQuery(FETCH_SQUAD_STATS, {
    variables: {
      teamId: teamId!,
      seasonId: filters?.seasons,
      competitionId: filters?.competitions,
      page,
      limit: 20,
      sortBy,
    },
    fetchPolicy: 'cache-first',
  });

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setPage(1);
  };

  const handleFiltersChange: React.Dispatch<React.SetStateAction<TFilters>> = value => {
    setFilters(value);
    setPage(1);
  };

  const displayData = data ?? previousData;

  return (
    <SquadStatsFiltersContext.Provider value={{ filters, setFilters: handleFiltersChange }}>
      <StatsView
        data={displayData}
        loading={loading}
        error={error}
        filters={filters}
        page={page}
        sortBy={sortBy}
        onPageChange={setPage}
        onSortChange={handleSortChange}
      />
    </SquadStatsFiltersContext.Provider>
  );
}
