import { useContext } from 'react';
import { MatchStatsContext } from './MatchStatsContext';

export const useMatchStatsFilters = () => {
  const ctx = useContext(MatchStatsContext);
  if (!ctx) {
    throw new Error('useMatchStatsFilters must be used within MatchStatsFiltersProvider');
  }
  return ctx;
};
