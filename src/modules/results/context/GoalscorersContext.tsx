import React, { createContext } from 'react';

export type TGoalscorersFilters = {
  competitionId: string;
};

type GoalscorersContextType = {
  filters: TGoalscorersFilters;
  setFilters: React.Dispatch<React.SetStateAction<TGoalscorersFilters>>;
};

export const GoalscorersContext = createContext<GoalscorersContextType | undefined>({
  filters: { competitionId: 'all' },
  setFilters: () => {},
});
