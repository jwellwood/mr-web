import { configureStore } from '@reduxjs/toolkit';
import { alertsReducer } from './features/alerts/alertsSlice';
import { authReducer } from './features/auth/authSlice';
import { matchesReducer } from './features/matches/matchesSlice';
import { playersReducer } from './features/players/playersSlice';
import { tabsReducer } from './features/tabs/tabsSlice';

export const store = configureStore({
  reducer: {
    alertsReducer,
    tabsReducer,
    authReducer,
    matchesReducer,
    playersReducer,
  },
});

// Infer the `RootState`,`AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const selectSelf = (state: RootState): RootState => state;
