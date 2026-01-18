import React, { createContext } from 'react';

export type TFilters = {
  seasons: string;
  competitions: string;
};

type FiltersContextType = {
  filters: TFilters;
  setFilters: React.Dispatch<React.SetStateAction<TFilters>>;
};

export const StatsFiltersContext = createContext<FiltersContextType | undefined>({
  filters: { seasons: 'all', competitions: 'all' },
  setFilters: () => {},
});
