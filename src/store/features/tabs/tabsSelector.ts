import { createSelector } from '@reduxjs/toolkit';
import { selectSelf } from '../../store';

export const getTabIndex = createSelector(selectSelf, ({ tabsReducer }) => tabsReducer);
