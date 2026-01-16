import React, { createContext } from 'react';

export type TFilters = {
  seasons: string;
  competitions: string;
  showAverages?: boolean;
};

type FiltersContextType = {
  filters: TFilters;
  setFilters: React.Dispatch<React.SetStateAction<TFilters>>;
};

export const FiltersContext = createContext<FiltersContextType | undefined>({
  filters: { seasons: 'all', competitions: 'all', showAverages: false },
  setFilters: () => {},
});
