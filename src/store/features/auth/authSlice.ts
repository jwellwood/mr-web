import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AUTH_ROLES, TAuthRoles } from '../../../app/constants.ts';

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
    setState: (
      state,
      action: PayloadAction<{
        roles?: TAuthRoles[];
        teamIds?: string[];
        orgIds?: string[];
      }>
    ) => {
      const { roles = [], orgIds = [], teamIds = [] } = action.payload;
      const isAuth = (roles && roles.includes(AUTH_ROLES.USER)) || false;
      const isTeamAdmin = (roles && roles.includes(AUTH_ROLES.TEAM_ADMIN)) || false;
      const isSiteAdmin = (roles && roles.includes(AUTH_ROLES.SITE_ADMIN)) || false;
      return {
        ...state,
        ...{
          isAuth,
          isTeamAdmin,
          isSiteAdmin,
          teamIds,
          orgIds,
        },
      };
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { setState: setAuth, resetState: resetAuth } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
