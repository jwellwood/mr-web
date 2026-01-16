import { useContext } from 'react';
import { FiltersContext } from './FiltersContext';

export const useFilters = () => {
  const ctx = useContext(FiltersContext);
  if (!ctx) {
    throw new Error('useFilters must be used within FiltersProvider');
  }
  return ctx;
};
