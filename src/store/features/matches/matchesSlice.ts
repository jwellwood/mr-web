import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ITempMatch } from '../../../modules/matches/types';

export const initialMatchState: ITempMatch = {
  date: new Date().toISOString(), // > convert to date object when used
  isHome: true,
  teamGoals: 0,
  opponentGoals: 0,
  leaguePosition: null,
  isForfeit: false,
  seasonId: '',
  competitionId: '',
  competitionName: '',
  teamName: '',
  teamBadgeUrl: null,
  opponentId: '',
  opponentName: '',
  opponentBadgeUrl: null,
  teamId: '',
  _id: '',
};

const matchesSlice = createSlice({
  name: 'matches',
  initialState: initialMatchState,
  reducers: {
    setState: (state, action: PayloadAction<ITempMatch>) => {
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
