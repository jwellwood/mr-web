import { MockLink } from '@apollo/client/testing';
import { MockedProvider } from '@apollo/client/testing/react';
import { renderHook, waitFor } from '@testing-library/react';
import { type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { FETCH_PLAYERS_BY_TEAM } from '../../graphql';
import { useGoalscorerOptions } from '../useGoalscorerOptions';

const players = [
  { __typename: 'PlayerBasic' as const, _id: 'p1', name: 'Alice' },
  { __typename: 'PlayerBasic' as const, _id: 'p2', name: 'Bob' },
];

const playersMock = {
  request: {
    query: FETCH_PLAYERS_BY_TEAM,
    variables: { teamId: 'team1', orgSeasonId: 'os1' },
  },
  result: { data: { players } },
};

const makeWrapper =
  (mocks: MockLink.MockedResponse[] = [playersMock]) =>
  ({ children }: { children: ReactNode }) => (
    <MockedProvider mocks={mocks}>{children}</MockedProvider>
  );

describe('useGoalscorerOptions', () => {
  it('returns loading=true initially', () => {
    const { result } = renderHook(() => useGoalscorerOptions('team1', 'os1'), {
      wrapper: makeWrapper(),
    });

    expect(result.current.playersLoading).toBe(true);
    expect(result.current.playerOptions).toEqual([]);
  });

  it('resolves player data and maps to ISelectOptions', async () => {
    const { result } = renderHook(() => useGoalscorerOptions('team1', 'os1'), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.playersLoading).toBe(false));

    expect(result.current.playerOptions).toEqual([
      { value: 'p1', label: 'Alice' },
      { value: 'p2', label: 'Bob' },
    ]);
  });

  it('skips the query and returns empty options when teamId is empty', async () => {
    const { result } = renderHook(() => useGoalscorerOptions('', 'os1'), {
      wrapper: makeWrapper([]),
    });

    await waitFor(() => expect(result.current.playersLoading).toBe(false));
    expect(result.current.playerOptions).toEqual([]);
  });

  it('returns empty options when the team has no players', async () => {
    const emptyMock = {
      request: {
        query: FETCH_PLAYERS_BY_TEAM,
        variables: { teamId: 'team-empty', orgSeasonId: 'os1' },
      },
      result: { data: { players: [] } },
    };

    const { result } = renderHook(() => useGoalscorerOptions('team-empty', 'os1'), {
      wrapper: makeWrapper([emptyMock]),
    });

    await waitFor(() => expect(result.current.playersLoading).toBe(false));
    expect(result.current.playerOptions).toEqual([]);
  });
});
