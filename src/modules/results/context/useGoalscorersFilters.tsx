import { useContext } from 'react';
import { GoalscorersContext } from './GoalscorersContext';

export const useGoalscorersFilters = () => {
  const ctx = useContext(GoalscorersContext);
  if (!ctx) {
    throw new Error('useGoalscorersFilters must be used within GoalscorersContext.Provider');
  }
  return ctx;
};
