import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react';
import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { alertsReducer } from '../../store/features/alerts/alertsSlice';
import { authReducer } from '../../store/features/auth/authSlice';
import { matchesReducer } from '../../store/features/matches/matchesSlice';
import { playersReducer } from '../../store/features/players/playersSlice';
import { tabsReducer } from '../../store/features/tabs/tabsSlice';
import { useAuth } from '../useAuth';

interface PartialAuthState {
  isAuth?: boolean;
  isTeamAdmin?: boolean;
  isSiteAdmin?: boolean;
  teamIds?: string[];
  orgIds?: string[];
  username?: string;
  authInitialized?: boolean;
}

const makeStore = (partial: PartialAuthState = {}) =>
  configureStore({
    reducer: { alertsReducer, authReducer, matchesReducer, playersReducer, tabsReducer },
    preloadedState: {
      authReducer: {
        isAuth: false,
        isTeamAdmin: false,
        isSiteAdmin: false,
        teamIds: [],
        orgIds: [],
        username: '',
        authInitialized: false,
        ...partial,
      },
    },
  });

const makeWrapper =
  (store: ReturnType<typeof makeStore>) =>
  ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>;

describe('useAuth', () => {
  it('returns isTeamAuth true when user is team admin and teamId is in teamIds', () => {
    const store = makeStore({ isTeamAdmin: true, teamIds: ['team1', 'team2'] });
    const { result } = renderHook(() => useAuth('team1'), { wrapper: makeWrapper(store) });
    expect(result.current.isTeamAuth).toBeTruthy();
  });

  it('returns isTeamAuth false when teamId is not in teamIds', () => {
    const store = makeStore({ isTeamAdmin: true, teamIds: ['team1'] });
    const { result } = renderHook(() => useAuth('team99'), { wrapper: makeWrapper(store) });
    expect(result.current.isTeamAuth).toBeFalsy();
  });

  it('returns isTeamAuth false when user is not a team admin', () => {
    const store = makeStore({ isTeamAdmin: false, teamIds: ['team1'] });
    const { result } = renderHook(() => useAuth('team1'), { wrapper: makeWrapper(store) });
    expect(result.current.isTeamAuth).toBeFalsy();
  });

  it('returns isTeamAuth false when no teamId argument is provided', () => {
    const store = makeStore({ isTeamAdmin: true, teamIds: ['team1'] });
    const { result } = renderHook(() => useAuth(), { wrapper: makeWrapper(store) });
    expect(result.current.isTeamAuth).toBeFalsy();
  });

  it('returns isOrgAuth true when orgId is in orgIds', () => {
    const store = makeStore({ orgIds: ['org1', 'org2'] });
    const { result } = renderHook(() => useAuth(undefined, 'org1'), {
      wrapper: makeWrapper(store),
    });
    expect(result.current.isOrgAuth).toBeTruthy();
  });

  it('returns isOrgAuth false when orgId is not in orgIds', () => {
    const store = makeStore({ orgIds: ['org1'] });
    const { result } = renderHook(() => useAuth(undefined, 'org99'), {
      wrapper: makeWrapper(store),
    });
    expect(result.current.isOrgAuth).toBeFalsy();
  });

  it('returns isOrgAuth false when no orgId argument is provided', () => {
    const store = makeStore({ orgIds: ['org1'] });
    const { result } = renderHook(() => useAuth(), { wrapper: makeWrapper(store) });
    expect(result.current.isOrgAuth).toBeFalsy();
  });

  it('exposes all auth fields from the store', () => {
    const store = makeStore({
      isAuth: true,
      isSiteAdmin: true,
      username: 'johndoe',
      authInitialized: true,
    });
    const { result } = renderHook(() => useAuth(), { wrapper: makeWrapper(store) });
    expect(result.current.isAuth).toBe(true);
    expect(result.current.isSiteAdmin).toBe(true);
    expect(result.current.username).toBe('johndoe');
    expect(result.current.authInitialized).toBe(true);
  });
});
