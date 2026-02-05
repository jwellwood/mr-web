import { useContext } from 'react';
import { PlayerStatsFiltersContext } from './PlayerStatsFiltersContext';

export const usePlayerStatsFilters = () => {
  const ctx = useContext(PlayerStatsFiltersContext);
  if (!ctx) {
    throw new Error('usePlayerStatsFilters must be used within PlayerStatsFiltersProvider');
  }
  return ctx;
};
