import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import type { CompetitionConfig } from '../../../seasons/helpers/mapOrgSeasonForm';
import { FETCH_LEAGUE_TABLES } from '../../graphql';
import LeagueTableWrapper from '../LeagueTableWrapper';

const { mockUseQuery, mockUseCustomParams } = vi.hoisted(() => ({
  mockUseQuery: vi.fn(),
  mockUseCustomParams: vi.fn(),
}));

vi.mock('@apollo/client/react', () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
}));

vi.mock('../../../../hooks', () => ({
  useCustomParams: () => mockUseCustomParams(),
}));

vi.mock('../../../../components', () => ({
  DataError: ({ error }: { error: Error }) => <div data-testid="data-error">{error.message}</div>,
}));

vi.mock('../../components/CupTable', () => ({
  default: ({ loading, data }: { loading: boolean; data: unknown }) => (
    <div
      data-testid="cup-table"
      data-loading={String(loading)}
      data-has-data={String(Boolean(data))}
    />
  ),
}));

vi.mock('../../components/league-table/LeagueTable', () => ({
  default: ({ loading, data }: { loading: boolean; data: unknown }) => (
    <div
      data-testid="league-table"
      data-loading={String(loading)}
      data-has-data={String(Boolean(data))}
    />
  ),
}));

const competitionConfig = (type: 'Cup' | 'League') =>
  ({ competitionId: { _id: 'competition-1' }, type }) as CompetitionConfig;

describe('LeagueTableWrapper', () => {
  beforeEach(() => {
    mockUseCustomParams.mockReturnValue({ orgId: 'org-1', orgSeasonId: 'season-1' });
    mockUseQuery
      .mockReset()
      .mockReturnValue({ loading: false, error: undefined, data: { data: [] } });
  });

  it('queries by organization, season, and competition, then renders the league table', () => {
    render(
      <TestWrapper>
        <LeagueTableWrapper competitionConfig={competitionConfig('League')} />
      </TestWrapper>
    );

    expect(mockUseQuery).toHaveBeenCalledWith(FETCH_LEAGUE_TABLES, {
      variables: { orgId: 'org-1', orgSeasonId: 'season-1', compId: 'competition-1' },
    });
    expect(screen.getByTestId('league-table')).toHaveAttribute('data-loading', 'false');
    expect(screen.getByTestId('league-table')).toHaveAttribute('data-has-data', 'true');
    expect(screen.queryByTestId('cup-table')).not.toBeInTheDocument();
  });

  it('defaults the season query variable when no season is selected', () => {
    mockUseCustomParams.mockReturnValue({ orgId: 'org-1', orgSeasonId: undefined });

    render(
      <TestWrapper>
        <LeagueTableWrapper competitionConfig={competitionConfig('Cup')} />
      </TestWrapper>
    );

    expect(mockUseQuery).toHaveBeenCalledWith(FETCH_LEAGUE_TABLES, {
      variables: { orgId: 'org-1', orgSeasonId: 'default', compId: 'competition-1' },
    });
    expect(screen.getByTestId('cup-table')).toBeInTheDocument();
    expect(screen.queryByTestId('league-table')).not.toBeInTheDocument();
  });

  it('renders the query error instead of either table', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: new Error('Unable to load standings'),
      data: undefined,
    });

    render(
      <TestWrapper>
        <LeagueTableWrapper competitionConfig={competitionConfig('League')} />
      </TestWrapper>
    );

    expect(screen.getByTestId('data-error')).toHaveTextContent('Unable to load standings');
    expect(screen.queryByTestId('league-table')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cup-table')).not.toBeInTheDocument();
  });

  it('forwards loading state to the selected table', () => {
    mockUseQuery.mockReturnValue({ loading: true, error: undefined, data: undefined });

    render(
      <TestWrapper>
        <LeagueTableWrapper competitionConfig={competitionConfig('League')} />
      </TestWrapper>
    );

    expect(screen.getByTestId('league-table')).toHaveAttribute('data-loading', 'true');
  });
});
