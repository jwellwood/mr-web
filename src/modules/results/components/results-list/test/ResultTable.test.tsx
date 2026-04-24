import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import { T_FETCH_RESULTS } from '../../../graphql';
import ResultTable from '../ResultTable';

vi.mock('../../../../../hooks', () => ({
  useCustomParams: () => ({ orgId: 'org-1' }),
}));

vi.mock('../../../../../components', async importOriginal => {
  const actual = await importOriginal<typeof import('../../../../../components')>();
  return {
    ...actual,
    CustomTable: ({
      rows,
      isSortable,
    }: {
      rows: unknown[];
      columns: unknown[];
      isSortable: boolean;
    }) => (
      <div data-testid="custom-table" data-sortable={String(isSortable)}>
        {rows.length} rows
      </div>
    ),
  };
});

const makeResult = (overrides: Partial<T_FETCH_RESULTS['results'][number]> = {}) =>
  ({
    _id: 'r-1',
    date: '2020-06-01T10:00:00.000Z',
    resultStatus: null,
    homeTeam: { _id: 'h-1', teamName: 'Home FC' },
    awayTeam: { _id: 'a-1', teamName: 'Away FC' },
    homeGoals: 1,
    awayGoals: 0,
    kickoffTime: '15:00',
    gameWeek: 1,
    isForfeit: false,
    isComplete: true,
    competitionId: { _id: 'c-1', name: 'League' },
    orgSeasonId: { _id: 'os-1' },
    homeGoalscorers: [],
    awayGoalscorers: [],
    submittedByTeam: null,
    confirmedByTeam: null,
    ...overrides,
  }) as T_FETCH_RESULTS['results'][number];

describe('ResultTable', () => {
  it('renders the CustomTable', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ResultTable results={[makeResult()]} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByTestId('custom-table')).toBeInTheDocument();
  });

  it('passes one row per result to the table', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ResultTable results={[makeResult(), makeResult({ _id: 'r-2' })]} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('2 rows')).toBeInTheDocument();
  });

  it('renders zero rows for an empty results array', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ResultTable results={[]} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('0 rows')).toBeInTheDocument();
  });

  it('renders the table with sorting disabled', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ResultTable results={[makeResult()]} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByTestId('custom-table')).toHaveAttribute('data-sortable', 'false');
  });
});
