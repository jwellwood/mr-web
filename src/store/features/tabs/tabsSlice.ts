import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ITabsState {
  profile: 0 | 1;
  org: 0 | 1;
  orgTeams: 0 | 1;
  team: 0 | 1 | 2 | 3;
  overview: 0 | 1;
  matches: 0 | 1;
  squad: 0 | 1;
  player: 0 | 1;
  history: 0 | 1 | 2;
  season: 0 | 1 | 2 | 3;
}

export type TabIndex = keyof ITabsState;

const initialState: ITabsState = {
  profile: 0,
  org: 0,
  orgTeams: 0,
  team: 0,
  overview: 0,
  matches: 0,
  squad: 0,
  player: 0,
  history: 0,
  season: 0,
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<ITabsState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setTabIndex: (state, action: PayloadAction<{ type: TabIndex; newValue: number }>) => {
      return {
        ...state,
        [action.payload.type]: action.payload.newValue,
      };
    },
  },
});

export const { setState: setTabState, setTabIndex } = tabsSlice.actions;
export const { reducer: tabsReducer } = tabsSlice;
