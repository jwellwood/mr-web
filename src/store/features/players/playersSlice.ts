import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

import type {IPlayerInMatch} from "../../../types";

interface IPlayerState {
    players: IPlayerInMatch[]
}

const initialState: IPlayerState = {
    players: []
}

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setState: (state, action: PayloadAction<IPlayerState>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        resetState: () => {
            return initialState;
        }
    }
})

export const {setState: setPlayers, resetState: resetPlayers} = playersSlice.actions;
export const {reducer: playersReducer} = playersSlice;