import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ITabsState {
    profile: 0 | 1,
    org: 0 | 1,
    orgTeams: 0 | 1,
    team: 0 | 1,
    overview: 0 | 1,
    matches: 0 | 1,
    squad: 0 | 1,
    player: 0 | 1,
    history: 0 | 1,
    season: 0 | 1,
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
                ...action.payload
            };
        },
        setTabIndex: (_, action: PayloadAction<number>) => {
            return {
                ...initialState,
                [action.payload]: 1
            }
        }
    }
})

export const { setState: setTabState, setTabIndex } = tabsSlice.actions;
export const { reducer: tabsReducer } = tabsSlice;
