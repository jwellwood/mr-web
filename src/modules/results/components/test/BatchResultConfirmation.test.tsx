import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import { BatchResultFormData } from '../../forms/batch-result/schema';
import BatchResultConfirmation from '../BatchResultConfirmation';

describe('BatchResultConfirmation', () => {
  it('previews result teams and scores and reports removed results', () => {
    const results: BatchResultFormData = {
      date: new Date('2026-01-01T12:00:00.000Z'),
      gameWeek: 4,
      competitionId: 'competition-1',
      orgSeasonId: 'season-1',
      matches: [
        {
          homeTeam: 'home-1',
          awayTeam: 'away-1',
          homeGoals: 3,
          awayGoals: 1,
          kickoffTime: '14:00',
          isForfeit: false,
          isBye: false,
        },
      ],
    };

    render(
      <TestWrapper>
        <BatchResultConfirmation
          results={results}
          teamOptions={[
            { value: 'home-1', label: 'Home United' },
            { value: 'away-1', label: 'Away Town' },
          ]}
          removedCount={2}
        />
      </TestWrapper>
    );

    expect(screen.getByText('2 result(s) will be removed')).toBeInTheDocument();
    expect(screen.getByText('Home United')).toBeInTheDocument();
    expect(screen.getByText('Away Town')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
