import { createSelector } from '@reduxjs/toolkit';
import { selectSelf } from '../../store';

export const getTempMatch = createSelector(selectSelf, ({ matchesReducer }) => matchesReducer);
