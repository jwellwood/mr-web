import { configureStore } from '@reduxjs/toolkit';
import { alertsReducer } from '../src/store/features/alerts/alertsSlice';
import { authReducer } from '../src/store/features/auth/authSlice';
import { matchesReducer } from '../src/store/features/matches/matchesSlice';
import { playersReducer } from '../src/store/features/players/playersSlice';
import { tabsReducer } from '../src/store/features/tabs/tabsSlice';

export const createStoryStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      alertsReducer,
      tabsReducer,
      authReducer,
      matchesReducer,
      playersReducer,
    },
    preloadedState,
  });
};
