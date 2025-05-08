import {createSelector} from "@reduxjs/toolkit";
import {selectSelf} from "../../store.ts";

export const getTempPlayers = createSelector(
    selectSelf,
    ({ playersReducer }) => playersReducer.players
)