import { useContext } from 'react';
import { PlayerOpponentFiltersContext } from './PlayerOpponentFilterContext';

export const usePlayerOpponentFilters = () => {
  const ctx = useContext(PlayerOpponentFiltersContext);
  if (!ctx) {
    throw new Error('usePlayerOpponentFilters must be used within PlayerOpponentFiltersProvider');
  }
  return ctx;
};
