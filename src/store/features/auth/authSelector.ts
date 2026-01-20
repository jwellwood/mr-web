import { createSelector } from 'reselect';
import { selectSelf } from '../../store';

export const getAuth = createSelector(selectSelf, ({ authReducer }) => authReducer);
