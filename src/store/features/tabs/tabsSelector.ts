import {createSelector} from "@reduxjs/toolkit";
import {selectSelf} from "../../store.ts";

export const getTabIndex = createSelector(selectSelf, ({tabsReducer}) => tabsReducer);