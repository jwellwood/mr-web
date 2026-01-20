import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ITempMatch } from '../../../modules/matches/types';

const date = new Date().toISOString();

export const initialMatchState: ITempMatch = {
  _id: '',
  teamId: '',
  seasonId: '',
  teamName: '',
  opponentId: '',
  opponentName: '',
  competitionId: '',
  competition: null,
  date,
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
        ...action.payload,
      };
    },
    resetState: () => {
      return initialMatchState;
    },
  },
});

export const { setState: setTmpMatch, resetState: resetTmpMatch } = matchesSlice.actions;
export const { reducer: matchesReducer } = matchesSlice;
