import { useContext } from 'react';
import { StatsFiltersContext } from './StatsFiltersContext';

export const useFilters = () => {
  const ctx = useContext(StatsFiltersContext);
  if (!ctx) {
    throw new Error('useFilters must be used within FiltersProvider');
  }
  return ctx;
};
