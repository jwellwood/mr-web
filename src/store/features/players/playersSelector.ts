import { createSelector } from '@reduxjs/toolkit';
import { selectSelf } from '../../store';

export const getTempPlayers = createSelector(
  selectSelf,
  ({ playersReducer }) => playersReducer.players
);
