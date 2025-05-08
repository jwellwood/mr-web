import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
    isAuth: boolean;
    isTeamAdmin: boolean;
    isSiteAdmin: boolean;
    teamIds: string[];
    orgIds: string[];
}

const initialState: IAuthState = {
    isAuth: false,
    isTeamAdmin: false,
    isSiteAdmin: false,
    teamIds: [],
    orgIds: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setState: (state, action: PayloadAction<IAuthState>) => {
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

export const { setState: setAuth, resetState: resetAuth } = authSlice.actions;
export const { reducer: authReducer } = authSlice;