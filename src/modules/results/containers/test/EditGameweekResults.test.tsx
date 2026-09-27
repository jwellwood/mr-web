import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import { useOrgSeasonOptions } from '../../../seasons/hooks/useOrgSeasonOptions';
import { FETCH_LEAGUE_TABLES } from '../../../tables/graphql';
import {
  ADD_RESULT,
  DELETE_RESULT,
  EDIT_RESULT,
  FETCH_RESULTS,
  T_FETCH_RESULTS,
} from '../../graphql';
import EditGameweekResults from '../EditGameweekResults';

const { mockUseMutation, mockUseQuery, mockAddResult, mockEditResult, mockDeleteResult } =
  vi.hoisted(() => ({
    mockUseMutation: vi.fn(),
    mockUseQuery: vi.fn(),
    mockAddResult: vi.fn(),
    mockEditResult: vi.fn(),
    mockDeleteResult: vi.fn(),
  }));

vi.mock('@apollo/client/react', () => ({
  useMutation: (...args: unknown[]) => mockUseMutation(...args),
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
}));

vi.mock('../../../../hooks', () => ({
  useCustomParams: () => ({ orgId: 'org-1', orgSeasonId: 'season-1', gameWeek: '4' }),
}));

vi.mock('../../../seasons/hooks/useOrgSeasonOptions', () => ({
  useOrgSeasonOptions: vi.fn(),
}));

vi.mock('../../pages/EditRoundPage', () => ({
  default: ({
    defaultValues,
    originalCount,
    onSubmit,
  }: {
    defaultValues: { matches: unknown[] } | null;
    originalCount: number;
    onSubmit: (values: {
      date: Date;
      gameWeek: number;
      competitionId: string;
      orgSeasonId: string;
      matches: {
        _id?: string;
        homeTeam: string;
        awayTeam: string;
        homeGoals: number;
        awayGoals: number;
        kickoffTime: string;
      }[];
    }) => Promise<void>;
  }) => (
    <>
      <div
        data-testid="edit-round-defaults"
        data-match-count={defaultValues?.matches.length}
        data-original-count={originalCount}
      />
      <button
        data-testid="save-gameweek"
        onClick={() =>
          void onSubmit({
            date: new Date('2026-02-03T14:00:00.000Z'),
            gameWeek: 4,
            competitionId: 'competition-1',
            orgSeasonId: 'season-1',
            matches: [
              {
                _id: 'result-update',
                homeTeam: 'home-1',
                awayTeam: 'away-1',
                homeGoals: 3,
                awayGoals: 1,
                kickoffTime: '14:00',
              },
              {
                homeTeam: 'home-2',
                awayTeam: 'away-2',
                homeGoals: 2,
                awayGoals: 0,
                kickoffTime: '15:00',
              },
            ],
          })
        }
      />
    </>
  ),
}));

const makeResult = (id: string, gameWeek: number, overrides = {}) =>
  ({
    _id: id,
    date: '2026-01-01T12:00:00.000Z',
    gameWeek,
    competitionId: { _id: 'competition-1', name: 'League' },
    orgSeasonId: { _id: 'season-1' },
    homeTeam: { _id: 'home-1', teamName: 'Home' },
    awayTeam: { _id: 'away-1', teamName: 'Away' },
    homeGoals: 1,
    awayGoals: 0,
    kickoffTime: '12:00',
    isForfeit: false,
    isBye: false,
    decision: null,
    winnerSide: null,
    ...overrides,
  }) as T_FETCH_RESULTS['results'][number];

const CurrentLocation = () => {
  const location = useLocation();
  return <div data-testid="current-location">{location.pathname + location.search}</div>;
};

describe('EditGameweekResults', () => {
  beforeEach(() => {
    mockAddResult.mockReset().mockResolvedValue({});
    mockEditResult.mockReset().mockResolvedValue({});
    mockDeleteResult.mockReset().mockResolvedValue({});
    mockUseQuery.mockReset().mockReturnValue({
      loading: false,
      error: undefined,
      data: {
        results: [
          makeResult('result-update', 4, { decision: 'PENALTIES', winnerSide: 'HOME' }),
          makeResult('result-delete', 4),
          makeResult('other-round', 5),
        ],
      },
    });
    mockUseMutation.mockReset().mockImplementation((mutation: unknown) => {
      if (mutation === ADD_RESULT) return [mockAddResult, { loading: false }];
      if (mutation === EDIT_RESULT) return [mockEditResult, { loading: false }];
      if (mutation === DELETE_RESULT) return [mockDeleteResult, { loading: false }];
      throw new Error('Unexpected mutation');
    });
    vi.mocked(useOrgSeasonOptions).mockReturnValue({
      orgSeasonOptions: [],
      loading: false,
    } as never);
  });

  it('adds, updates, and deletes gameweek results before returning', async () => {
    render(
      <MemoryRouter
        initialEntries={['/results?filter=team-1', '/edit?competitionId=competition-1']}
        initialIndex={1}
      >
        <TestWrapper>
          <Suspense fallback={<div>Loading</div>}>
            <EditGameweekResults />
          </Suspense>
          <CurrentLocation />
        </TestWrapper>
      </MemoryRouter>
    );

    expect(await screen.findByTestId('edit-round-defaults')).toHaveAttribute(
      'data-match-count',
      '2'
    );
    expect(screen.getByTestId('edit-round-defaults')).toHaveAttribute('data-original-count', '2');
    expect(mockUseQuery).toHaveBeenCalledWith(FETCH_RESULTS, {
      variables: { orgId: 'org-1', orgSeasonId: 'season-1', competitionId: 'competition-1' },
      skip: false,
    });

    fireEvent.click(screen.getByTestId('save-gameweek'));

    await waitFor(() => expect(mockAddResult).toHaveBeenCalledTimes(1));
    expect(mockAddResult).toHaveBeenCalledWith({
      variables: {
        orgId: 'org-1',
        orgSeasonId: 'season-1',
        competitionId: 'competition-1',
        date: '2026-02-03T14:00:00.000Z',
        gameWeek: 4,
        homeTeam: 'home-2',
        awayTeam: 'away-2',
        homeGoals: 2,
        awayGoals: 0,
        kickoffTime: '15:00',
        decision: undefined,
        winnerSide: undefined,
        isForfeit: false,
        isBye: false,
      },
    });
    expect(mockEditResult).toHaveBeenCalledWith({
      variables: {
        orgId: 'org-1',
        resultId: 'result-update',
        orgSeasonId: 'season-1',
        competitionId: 'competition-1',
        date: '2026-02-03T14:00:00.000Z',
        kickoffTime: '14:00',
        gameWeek: 4,
        homeTeam: 'home-1',
        awayTeam: 'away-1',
        homeGoals: 3,
        awayGoals: 1,
        isForfeit: false,
        isBye: false,
        decision: 'PENALTIES',
        winnerSide: 'HOME',
      },
    });
    expect(mockDeleteResult).toHaveBeenCalledWith({
      variables: { orgId: 'org-1', resultId: 'result-delete' },
    });
    expect(mockUseMutation).toHaveBeenCalledWith(
      DELETE_RESULT,
      expect.objectContaining({
        refetchQueries: [
          {
            query: FETCH_RESULTS,
            variables: {
              orgId: 'org-1',
              orgSeasonId: 'season-1',
              competitionId: 'competition-1',
            },
          },
          {
            query: FETCH_LEAGUE_TABLES,
            variables: { orgId: 'org-1', orgSeasonId: 'season-1', compId: 'competition-1' },
          },
        ],
        awaitRefetchQueries: true,
        onError: expect.any(Function),
      })
    );
    await waitFor(() =>
      expect(screen.getByTestId('current-location')).toHaveTextContent('/results?filter=team-1')
    );
  });
});
