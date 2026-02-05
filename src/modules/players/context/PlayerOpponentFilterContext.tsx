import React, { createContext } from 'react';

export type TPlayerOpponentFilters = {
  showAllOpponents: boolean;
  showAverages: boolean;
};

type PlayerOpponentFiltersContextType = {
  filters: TPlayerOpponentFilters;
  setFilters: React.Dispatch<React.SetStateAction<TPlayerOpponentFilters>>;
};

export const PlayerOpponentFiltersContext = createContext<
  PlayerOpponentFiltersContextType | undefined
>({
  filters: { showAllOpponents: false, showAverages: false },
  setFilters: () => {},
});
