import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import { T_FETCH_LEAGUE_TABLES } from '../../../graphql';
import LeagueTable from '../LeagueTable';

vi.mock('../../../../../hooks', () => ({
  useCustomParams: () => ({ orgId: 'org-1' }),
}));

vi.mock('../../../../../components', async importOriginal => {
  const actual = await importOriginal<typeof import('../../../../../components')>();
  return {
    ...actual,
    CustomTable: ({ rows }: { rows: { points: React.ReactNode }[] }) => (
      <table>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  };
});

const tableData: T_FETCH_LEAGUE_TABLES = {
  data: [
    {
      team: { _id: 'team-1', teamName: 'Team One' },
      played: 4,
      wins: 3,
      draws: 0,
      losses: 1,
      goalsFor: 8,
      goalsAgainst: 3,
      goalDiff: 5,
      points: 12,
      startingPoints: 3,
    },
  ],
};

describe('LeagueTable', () => {
  it('opens the points breakdown with starting, earned, and total points', () => {
    render(
      <TestWrapper>
        <LeagueTable data={tableData} competitionConfig={{ teams: [] } as never} />
      </TestWrapper>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Points breakdown')).toBeInTheDocument();
    expect(screen.getByText('Initial points')).toBeInTheDocument();
    expect(screen.getByText('Earned points')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getAllByText('3')).toHaveLength(2);
    expect(screen.getAllByText('9')).toHaveLength(2);
    expect(screen.getByRole('dialog')).toHaveTextContent('3 + 9 = 12');
  });
});
