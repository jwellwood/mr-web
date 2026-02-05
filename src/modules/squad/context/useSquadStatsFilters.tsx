import { useContext } from 'react';
import { SquadStatsFiltersContext } from './SquadStatsFiltersContext';

export const useSquadStatsFilters = () => {
  const ctx = useContext(SquadStatsFiltersContext);
  if (!ctx) {
    throw new Error('useSquadStatsFilters must be used within SquadStatsFiltersContext');
  }
  return ctx;
};
