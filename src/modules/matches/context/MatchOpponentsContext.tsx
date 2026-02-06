import React, { createContext } from 'react';

export type TMatchOpponentFilters = {
  includeForfeits: boolean;
  showAllTeams: boolean;
};

type MatchOpponentsContextType = {
  filters: TMatchOpponentFilters;
  setFilters: React.Dispatch<React.SetStateAction<TMatchOpponentFilters>>;
};

export const MatchOpponentsContext = createContext<MatchOpponentsContextType | undefined>({
  filters: { includeForfeits: true, showAllTeams: false },
  setFilters: () => {},
});
