import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AUTH_ROLES, TAuthRoles } from '../../../constants';

interface IAuthState {
  isAuth: boolean;
  isTeamAdmin: boolean;
  isSiteAdmin: boolean;
  teamIds: string[];
  orgIds: string[];
  username?: string;
  authInitialized: boolean;
}

const initialState: IAuthState = {
  isAuth: false,
  isTeamAdmin: false,
  isSiteAdmin: false,
  teamIds: [],
  orgIds: [],
  username: '',
  authInitialized: false,
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
        username?: string;
      }>
    ) => {
      const { roles = [], orgIds = [], teamIds = [], username } = action.payload;
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
          username,
          authInitialized: true,
        },
      };
    },
    resetState: () => {
      return { ...initialState, authInitialized: true };
    },
  },
});

export const { setState: setAuth, resetState: resetAuth } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
