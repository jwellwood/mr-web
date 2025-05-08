import {createSelector} from 'reselect';
import {selectSelf} from "../../store.ts";

export const getAlert = createSelector(selectSelf, ({alertsReducer}) => alertsReducer);