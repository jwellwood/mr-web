import { MockLink } from '@apollo/client/testing';
import { MockedProvider } from '@apollo/client/testing/react';
import { renderHook, waitFor } from '@testing-library/react';
import { type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import i18n from '../../i18n/react-i18n';
import { FETCH_ORG } from '../../modules/organization/graphql';
import { FETCH_SEASONS } from '../../modules/teamseasons/graphql';
import { store } from '../../store/store';
import { useStatsFilters } from '../useStatsFilters';

const seasonsMock = {
  request: { query: FETCH_SEASONS, variables: { teamId: 'team1' } },
  result: {
    data: {
      seasons: [
        {
          _id: 'season-1',
          name: '2024/25',
          yearStarted: '2024',
          yearEnded: '2025',
          leaguePosition: 1,
          totalFinalPositions: 10,
          division: 'Premier',
        },
      ],
    },
  },
};

const orgMock = {
  request: { query: FETCH_ORG, variables: { orgId: 'org1' } },
  result: {
    data: {
      org: {
        _id: 'org1',
        name: 'Test Org',
        website: null,
        yearFounded: '2000',
        city: 'Madrid',
        country: 'ES',
        competitions: [
          {
            _id: 'comp-1',
            name: 'League Cup',
            competitionType: 'league',
            playersPerTeam: 11,
            matchMinutes: 90,
            isActive: true,
          },
          {
            _id: 'comp-2',
            name: 'FA Cup',
            competitionType: 'cup',
            playersPerTeam: 11,
            matchMinutes: 90,
            isActive: true,
          },
        ],
        badge: { url: 'https://example.com/badge.png', public_id: 'badge123' },
      },
    },
  },
};

const makeWrapper =
  (path: string, route: string, mocks: MockLink.MockedResponse[] = [seasonsMock]) =>
  ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[path]}>
      <MockedProvider mocks={mocks}>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <Routes>
              <Route path={route} element={<>{children}</>} />
            </Routes>
          </I18nextProvider>
        </Provider>
      </MockedProvider>
    </MemoryRouter>
  );

describe('useStatsFilters', () => {
  it('prepends an "All seasons" option to seasonOptions', async () => {
    const { result } = renderHook(() => useStatsFilters(), {
      wrapper: makeWrapper('/team/team1', '/team/:teamId'),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    const allSeasonsOption = result.current.seasonOptions[0];
    expect(allSeasonsOption.value).toBe('all');
    expect(allSeasonsOption.label).toBe('All seasons');
  });

  it('includes season data options after the "All seasons" sentinel', async () => {
    const { result } = renderHook(() => useStatsFilters(), {
      wrapper: makeWrapper('/team/team1', '/team/:teamId'),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.seasonOptions.length).toBeGreaterThan(1);
    expect(result.current.seasonOptions[1]).toEqual({ label: '2024/25', value: 'season-1' });
  });

  it('returns only the "All competitions" sentinel when no orgId is in the URL', async () => {
    const { result } = renderHook(() => useStatsFilters(), {
      wrapper: makeWrapper('/team/team1', '/team/:teamId'),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.competitionOptions).toHaveLength(1);
    expect(result.current.competitionOptions[0].value).toBe('all');
  });

  it('prepends an "All competitions" option and lists org competitions when orgId is present', async () => {
    const { result } = renderHook(() => useStatsFilters(), {
      wrapper: makeWrapper('/team/team1/org/org1', '/team/:teamId/org/:orgId', [
        seasonsMock,
        orgMock,
      ]),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.competitionOptions[0]).toEqual({
      label: 'All competitions',
      value: 'all',
    });
    expect(result.current.competitionOptions).toHaveLength(3); // sentinel + 2 competitions
    expect(result.current.competitionOptions[1]).toEqual({ label: 'League Cup', value: 'comp-1' });
    expect(result.current.competitionOptions[2]).toEqual({ label: 'FA Cup', value: 'comp-2' });
  });
});
