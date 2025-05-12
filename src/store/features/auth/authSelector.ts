import { createSelector } from 'reselect';
import { selectSelf } from '../../store.ts';

export const getAuth = createSelector(selectSelf, ({ authReducer }) => authReducer);
