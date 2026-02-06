import { useContext } from 'react';
import { MatchOpponentsContext } from './MatchOpponentsContext';

export const useMatchOpponentFilters = () => {
  const ctx = useContext(MatchOpponentsContext);
  if (!ctx) {
    throw new Error('useMatchOpponentsFilters must be used within MatchOpponentFiltersProvider');
  }
  return ctx;
};
