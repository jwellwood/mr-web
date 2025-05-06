import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

import type {ITempMatch} from "../../../types";

const initialMatchState: ITempMatch = {
    _id: '',
    teamId: '',
    seasonId: '',
    teamName: '',
    opponentId: '',
    opponentName: '',
    competitionId: '',
    competition: null,
    date: new Date().toString(),
    isHome: true,
    teamGoals: 0,
    opponentGoals: 0,
    leaguePosition: 1,
    cupRound: '',
    isForfeit: false,
    matchPlayers: [],
};

const matchesSlice = createSlice({
    name: 'matches',
    initialState: initialMatchState,
    reducers: {
        setState: (state, action: PayloadAction<Partial<ITempMatch>>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        resetState: () => {
            return initialMatchState;
        }

    },
});

export const {setState: setTmpMatch, resetState: resetTmpState} = matchesSlice.actions;
export const {reducer: matchesReducer} = matchesSlice;