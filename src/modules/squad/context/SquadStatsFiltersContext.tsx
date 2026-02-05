import React, { createContext } from 'react';

export type TFilters = {
  seasons: string;
  competitions: string;
  showAverages?: boolean;
};

type SquadStatsFiltersContextType = {
  filters: TFilters;
  setFilters: React.Dispatch<React.SetStateAction<TFilters>>;
};

export const SquadStatsFiltersContext = createContext<SquadStatsFiltersContextType | undefined>({
  filters: { seasons: 'all', competitions: 'all', showAverages: false },
  setFilters: () => {},
});
