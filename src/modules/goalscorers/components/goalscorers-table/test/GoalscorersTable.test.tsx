import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import GoalScorersTable from '../GoalscorersTable';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('../../../../../hooks', () => ({
  useCustomParams: () => ({ orgId: 'org-1' }),
}));

vi.mock('../../../../../components', () => ({
  CustomTable: ({ rows, loading }: { rows: unknown[]; loading?: boolean }) => (
    <div data-testid="custom-table" data-loading={String(loading)}>
      {rows.length} rows
    </div>
  ),
  DataError: ({ error }: { error: Error }) => <div data-testid="data-error">{error.message}</div>,
  NoDataText: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="no-data-text">{children}</div>
  ),
  SectionContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const mockData = [
  {
    goals: 5,
    player: { _id: 'p1', name: 'Alice' },
    team: { _id: 't1', teamName: 'Team A', badgeUrl: null },
  },
  {
    goals: 3,
    player: { _id: 'p2', name: 'Bob' },
    team: { _id: 't2', teamName: 'Team B', badgeUrl: null },
  },
];

describe('GoalScorersTable', () => {
  it('renders the table with correct row count when data is provided', () => {
    render(<GoalScorersTable data={mockData as never} loading={false} />);

    expect(screen.getByTestId('custom-table')).toBeInTheDocument();
    expect(screen.getByText('2 rows')).toBeInTheDocument();
  });

  it('shows no data text when data is an empty array and not loading', () => {
    render(<GoalScorersTable data={[]} loading={false} />);

    expect(screen.getByTestId('no-data-text')).toBeInTheDocument();
    expect(screen.getByText('NO_DATA.GOALSCORERS')).toBeInTheDocument();
    expect(screen.queryByTestId('custom-table')).not.toBeInTheDocument();
  });

  it('shows the table while loading even when data is undefined', () => {
    render(<GoalScorersTable data={undefined} loading={true} />);

    expect(screen.getByTestId('custom-table')).toBeInTheDocument();
    expect(screen.queryByTestId('no-data-text')).not.toBeInTheDocument();
  });

  it('shows the table while loading even when data is empty', () => {
    render(<GoalScorersTable data={[]} loading={true} />);

    expect(screen.getByTestId('custom-table')).toBeInTheDocument();
    expect(screen.queryByTestId('no-data-text')).not.toBeInTheDocument();
  });

  it('renders a data error when an error is provided', () => {
    const error = new Error('Network error') as never;

    render(<GoalScorersTable data={[]} loading={false} error={error} />);

    expect(screen.getByTestId('data-error')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });
});
