import { createSelector } from 'reselect';
import { selectSelf } from '../../store';

export const getAlert = createSelector(selectSelf, ({ alertsReducer }) => alertsReducer);
