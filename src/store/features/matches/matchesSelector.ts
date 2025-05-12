import { createSelector } from '@reduxjs/toolkit';
import { selectSelf } from '../../store.ts';

export const getTempMatch = createSelector(selectSelf, ({ matchesReducer }) => matchesReducer);
