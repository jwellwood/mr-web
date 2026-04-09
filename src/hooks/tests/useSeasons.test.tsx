import { MockedProvider } from '@apollo/client/testing/react';
import { renderHook, waitFor, act } from '@testing-library/react';
import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { FETCH_SEASONS } from '../../modules/teamseasons/graphql';
import { store } from '../../store/store';
import { useSeasons } from '../useSeasons';

const season1 = {
  _id: 'season-1',
  name: '2024/25',
  yearStarted: '2024',
  yearEnded: '2025',
  leaguePosition: 1,
  totalFinalPositions: 10,
  division: 'Premier',
};

const season2 = {
  _id: 'season-2',
  name: '2023/24',
  yearStarted: '2023',
  yearEnded: '2024',
  leaguePosition: 2,
  totalFinalPositions: 10,
  division: 'Premier',
};

const seasonsMock = {
  request: { query: FETCH_SEASONS, variables: { teamId: 'team1' } },
  result: { data: { seasons: [season1, season2] } },
};

const makeWrapper =
  (path: string, mocks = [seasonsMock]) =>
  ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[path]}>
      <MockedProvider mocks={mocks}>
        <Provider store={store}>
          <Routes>
            <Route path="/team/:teamId" element={<>{children}</>} />
          </Routes>
        </Provider>
      </MockedProvider>
    </MemoryRouter>
  );

describe('useSeasons', () => {
  it('returns loading true initially then resolves with season data', async () => {
    const { result } = renderHook(() => useSeasons(), {
      wrapper: makeWrapper('/team/team1'),
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.seasonReady).toBe(true));

    expect(result.current.data?.seasons).toHaveLength(2);
  });

  it('defaults seasonId to the first season when no params are provided', async () => {
    const { result } = renderHook(() => useSeasons(), {
      wrapper: makeWrapper('/team/team1'),
    });

    await waitFor(() => expect(result.current.seasonReady).toBe(true));
    expect(result.current.seasonId).toBe('season-1');
  });

  it('uses the season query param over the data default', async () => {
    const { result } = renderHook(() => useSeasons(), {
      wrapper: makeWrapper('/team/team1?season=season-2'),
    });

    await waitFor(() => expect(result.current.seasonReady).toBe(true));
    expect(result.current.seasonId).toBe('season-2');
  });

  it('builds seasonOptions with correct label/value pairs', async () => {
    const { result } = renderHook(() => useSeasons(), {
      wrapper: makeWrapper('/team/team1'),
    });

    await waitFor(() => expect(result.current.seasonReady).toBe(true));

    expect(result.current.seasonOptions).toHaveLength(2);
    expect(result.current.seasonOptions[0]).toEqual({ label: '2024/25', value: 'season-1' });
    expect(result.current.seasonOptions[1]).toEqual({ label: '2023/24', value: 'season-2' });
  });

  it('returns the yearEnded of the active season as seasonEndDate', async () => {
    const { result } = renderHook(() => useSeasons(), {
      wrapper: makeWrapper('/team/team1'),
    });

    await waitFor(() => expect(result.current.seasonReady).toBe(true));
    expect(result.current.seasonEndDate).toBe('2025');
  });

  it('onSelectSeason updates the active season via search params', async () => {
    const { result } = renderHook(() => useSeasons(), {
      wrapper: makeWrapper('/team/team1'),
    });

    await waitFor(() => expect(result.current.seasonReady).toBe(true));

    act(() => {
      result.current.onSelectSeason('season-2');
    });

    expect(result.current.seasonId).toBe('season-2');
  });
});
