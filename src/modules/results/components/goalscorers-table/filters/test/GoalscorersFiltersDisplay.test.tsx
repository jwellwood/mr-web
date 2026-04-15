import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../../../utils/test-helpers/TestWrapper';
import { GoalscorersContext } from '../../../../context';
import GoalscorersFiltersDisplay from '../GoalscorersFiltersDisplay';

vi.mock('react-i18next', async importOriginal => {
  const actual = await importOriginal<typeof import('react-i18next')>();
  return { ...actual, useTranslation: () => ({ t: (key: string) => key }) };
});

const competitionOptions = [
  { label: 'All Competitions', value: 'all' },
  { label: 'League A', value: 'comp-1' },
];

function renderWithContext(competitionId: string) {
  return render(
    <TestWrapper>
      <GoalscorersContext.Provider value={{ filters: { competitionId }, setFilters: vi.fn() }}>
        <GoalscorersFiltersDisplay competitionOptions={competitionOptions} />
      </GoalscorersContext.Provider>
    </TestWrapper>
  );
}

describe('GoalscorersFiltersDisplay', () => {
  it('shows the "All Competitions" chip when no filter is applied', () => {
    renderWithContext('all');

    expect(screen.getByText('FILTERS.ALL_COMPETITIONS')).toBeInTheDocument();
  });

  it('shows the competition name chip when a specific competition is selected', () => {
    renderWithContext('comp-1');

    expect(screen.getByText('League A')).toBeInTheDocument();
  });

  it('falls back to an empty string for an unknown competitionId', () => {
    renderWithContext('unknown-id');

    // The chip label falls back to '' — the "All Competitions" text should not appear
    expect(screen.queryByText('FILTERS.ALL_COMPETITIONS')).not.toBeInTheDocument();
  });
});
