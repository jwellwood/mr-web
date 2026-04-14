import { MockLink } from '@apollo/client/testing';
import { MockedProvider } from '@apollo/client/testing/react';
import { renderHook, waitFor } from '@testing-library/react';
import { type ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { FETCH_ORG_SEASON } from '../../../seasons/graphql';
import useCompetitionConfig from '../useCompetitionConfig';

const orgSeasonData = {
  orgSeason: {
    __typename: 'OrgSeason' as const,
    _id: 'os1',
    name: '2024/25',
    yearStarted: '2024',
    yearEnded: '2025',
    isCurrent: true,
    comment: null,
    teamIds: [],
    competitionConfigs: [
      {
        __typename: 'CompetitionConfig' as const,
        priority: 1,
        rounds: 26,
        relegationPositions: [],
        promotionPositions: [],
        splitIndexes: [],
        competitionId: { __typename: 'Competition' as const, _id: 'comp1', name: 'League' },
      },
      {
        __typename: 'CompetitionConfig' as const,
        priority: 2,
        rounds: 4,
        relegationPositions: [],
        promotionPositions: [],
        splitIndexes: [],
        competitionId: { __typename: 'Competition' as const, _id: 'comp2', name: 'Cup' },
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
        <Routes>
          <Route path="/org/:orgId/org_season/:orgSeasonId" element={<>{children}</>} />
        </Routes>
      </MockedProvider>
    </MemoryRouter>
  );

describe('useCompetitionConfig', () => {
  it('returns loading=true initially', () => {
    const { result } = renderHook(() => useCompetitionConfig(), {
      wrapper: makeWrapper('/org/org1/org_season/os1'),
    });

    expect(result.current.loading).toBe(true);
  });

  it('resolves and maps competition configs correctly', async () => {
    const { result } = renderHook(() => useCompetitionConfig(), {
      wrapper: makeWrapper('/org/org1/org_season/os1'),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.competitionConfig).toEqual([
      { id: 'comp1', name: 'League', priority: 1 },
      { id: 'comp2', name: 'Cup', priority: 2 },
    ]);
  });

  it('uses competition _id as the id when available', async () => {
    const { result } = renderHook(() => useCompetitionConfig(), {
      wrapper: makeWrapper('/org/org1/org_season/os1'),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.competitionConfig?.[0].id).toBe('comp1');
  });

  it('falls back to name as id and MAX_SAFE_INTEGER as priority when fields are null', async () => {
    const nullFieldsMock = {
      request: { query: FETCH_ORG_SEASON, variables: { seasonId: 'os1' } },
      result: {
        data: {
          orgSeason: {
            ...orgSeasonData.orgSeason,
            competitionConfigs: [
              {
                __typename: 'CompetitionConfig' as const,
                priority: null,
                rounds: null,
                relegationPositions: [],
                promotionPositions: [],
                splitIndexes: [],
                competitionId: {
                  __typename: 'Competition' as const,
                  _id: null,
                  name: 'Friendly',
                },
              },
            ],
          },
        },
      },
    };

    const { result } = renderHook(() => useCompetitionConfig(), {
      wrapper: makeWrapper('/org/org1/org_season/os1', [nullFieldsMock]),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.competitionConfig?.[0]).toEqual({
      id: 'Friendly',
      name: 'Friendly',
      priority: Number.MAX_SAFE_INTEGER,
    });
  });

  it('skips the query and returns undefined config when orgSeasonId is absent', async () => {
    const noOrgSeasonWrapper = ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={['/org/org1']}>
        <MockedProvider mocks={[]}>
          <Routes>
            <Route path="/org/:orgId" element={<>{children}</>} />
          </Routes>
        </MockedProvider>
      </MemoryRouter>
    );

    const { result } = renderHook(() => useCompetitionConfig(), {
      wrapper: noOrgSeasonWrapper,
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.competitionConfig).toBeUndefined();
  });
});
