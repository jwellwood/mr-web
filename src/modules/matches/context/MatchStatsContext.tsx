import React, { createContext } from 'react';

export type TMatchStatsFilters = {
  competition: 'all';
  includeForfeits: boolean;
};

type MatchStatsContextType = {
  filters: TMatchStatsFilters;
  setFilters: React.Dispatch<React.SetStateAction<TMatchStatsFilters>>;
};

export const MatchStatsContext = createContext<MatchStatsContextType | undefined>({
  filters: { competition: 'all', includeForfeits: true },
  setFilters: () => {},
});
