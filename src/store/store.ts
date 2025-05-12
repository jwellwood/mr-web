import { configureStore } from '@reduxjs/toolkit';

import { alertsReducer } from './features/alerts/alertsSlice.ts';
import { tabsReducer } from './features/tabs/tabsSlice.ts';
import { authReducer } from './features/auth/authSlice.ts';
import { matchesReducer } from './features/matches/matchesSlice.ts';
import { playersReducer } from './features/players/playersSlice.ts';

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
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const selectSelf = (state: RootState): RootState => state;
