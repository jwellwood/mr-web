import { MockLink } from '@apollo/client/testing';
import { MockedProvider } from '@apollo/client/testing/react';
import { renderHook, waitFor } from '@testing-library/react';
import { type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import i18n from '../../../../i18n/react-i18n';
import { FETCH_ORG_SEASON } from '../../../seasons/graphql';
import { useTeamOptions } from '../useResultInput';

const orgSeasonData = {
  orgSeason: {
    __typename: 'OrgSeason' as const,
    _id: 'os1',
    name: '2024/25',
    yearStarted: '2024',
    yearEnded: '2025',
    isCurrent: true,
    comment: null,
    teamIds: [
      { __typename: 'Team' as const, _id: 'team1', teamName: 'Home FC' },
      { __typename: 'Team' as const, _id: 'team2', teamName: 'Away United' },
    ],
    competitionConfigs: [
      {
        __typename: 'CompetitionConfig' as const,
        priority: 1,
        rounds: 5,
        relegationPositions: [],
        promotionPositions: [],
        splitIndexes: [],
        competitionId: { __typename: 'Competition' as const, _id: 'comp1', name: 'League' },
      },
    ],
  },
};

const orgSeasonMock = {
  request: { query: FETCH_ORG_SEASON, variables: { seasonId: 'os1' } },
  result: { data: orgSeasonData },
};

const makeWrapper =
  (path: string, mocks: MockLink.MockedResponse[] = [orgSeasonMock]) =>
  ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[path]}>
      <MockedProvider mocks={mocks}>
        <I18nextProvider i18n={i18n}>
          <Routes>
            <Route path="/org/:orgId/org_season/:orgSeasonId" element={<>{children}</>} />
          </Routes>
        </I18nextProvider>
      </MockedProvider>
    </MemoryRouter>
  );

describe('useTeamOptions', () => {
  it('returns loading=true initially', () => {
    const { result } = renderHook(() => useTeamOptions(), {
      wrapper: makeWrapper('/org/org1/org_season/os1'),
    });

    expect(result.current.loading).toBe(true);
  });

  it('resolves and maps teams to ISelectOptions', async () => {
    const { result } = renderHook(() => useTeamOptions(), {
      wrapper: makeWrapper('/org/org1/org_season/os1'),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.teamOptions).toEqual([
      { value: 'team2', label: 'Away United' },
      { value: 'team1', label: 'Home FC' },
    ]);
  });

  it('resolves and maps round options with translated labels', async () => {
    const { result } = renderHook(() => useTeamOptions(), {
      wrapper: makeWrapper('/org/org1/org_season/os1'),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    // rounds: 5, getNumberOptions(5) gives 0..5
    expect(result.current.roundOptions).toHaveLength(6);
    expect(result.current.roundOptions[0].value).toBe(0);
    expect(result.current.roundOptions[1].value).toBe(1);
    // labels include the translated 'Round' prefix
    expect(String(result.current.roundOptions[1].label)).toContain('1');
  });

  it('returns empty teamOptions and roundOptions when no org season data', async () => {
    const emptyMock = {
      request: { query: FETCH_ORG_SEASON, variables: { seasonId: 'os1' } },
      result: {
        data: {
          orgSeason: {
            ...orgSeasonData.orgSeason,
            teamIds: [],
            competitionConfigs: [],
          },
        },
      },
    };

    const { result } = renderHook(() => useTeamOptions(), {
      wrapper: makeWrapper('/org/org1/org_season/os1', [emptyMock]),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.teamOptions).toEqual([]);
    expect(result.current.roundOptions).toEqual([]);
  });

  it('returns empty roundOptions when competitionConfigs has no rounds', async () => {
    const noRoundsMock = {
      request: { query: FETCH_ORG_SEASON, variables: { seasonId: 'os1' } },
      result: {
        data: {
          orgSeason: {
            ...orgSeasonData.orgSeason,
            competitionConfigs: [
              {
                __typename: 'CompetitionConfig' as const,
                priority: 1,
                rounds: null,
                relegationPositions: [],
                promotionPositions: [],
                splitIndexes: [],
                competitionId: {
                  __typename: 'Competition' as const,
                  _id: 'comp1',
                  name: 'League',
                },
              },
            ],
          },
        },
      },
    };

    const { result } = renderHook(() => useTeamOptions(), {
      wrapper: makeWrapper('/org/org1/org_season/os1', [noRoundsMock]),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.roundOptions).toEqual([]);
  });
});
