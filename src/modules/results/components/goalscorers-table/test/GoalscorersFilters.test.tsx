import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import { GoalscorersContext, TGoalscorersFilters } from '../../../context';
import GoalscorersFilters from '../GoalscorersFilters';

vi.mock('react-i18next', async importOriginal => {
  const actual = await importOriginal<typeof import('react-i18next')>();
  return { ...actual, useTranslation: () => ({ t: (key: string) => key }) };
});

vi.mock('../../../../../hooks', () => ({
  useStatsFilters: () => ({
    competitionOptions: [
      { label: 'All Competitions', value: 'all' },
      { label: 'League A', value: 'comp-1' },
    ],
  }),
}));

const DEFAULT_FILTERS: TGoalscorersFilters = { competitionId: 'all' };

function renderWithContext(setFilters = vi.fn()) {
  return render(
    <TestWrapper>
      <GoalscorersContext.Provider value={{ filters: DEFAULT_FILTERS, setFilters }}>
        <GoalscorersFilters />
      </GoalscorersContext.Provider>
    </TestWrapper>
  );
}

describe('GoalscorersFilters', () => {
  it('renders the filter display with the default chip', () => {
    renderWithContext();

    expect(screen.getByText('FILTERS.ALL_COMPETITIONS')).toBeInTheDocument();
  });

  it('calls setFilters with default values when the reset icon is clicked', async () => {
    const setFilters = vi.fn();
    const user = userEvent.setup();
    renderWithContext(setFilters);

    await user.click(screen.getByText('FILTERS.ALL_COMPETITIONS'));
    await user.click(screen.getByTestId('reset-icon'));

    expect(setFilters).toHaveBeenCalledWith(DEFAULT_FILTERS);
  });

  it('calls setFilters with current form values when Apply is clicked', async () => {
    const setFilters = vi.fn();
    const user = userEvent.setup();
    renderWithContext(setFilters);

    await user.click(screen.getByText('FILTERS.ALL_COMPETITIONS'));
    await user.click(screen.getByText('FORM.BUTTONS.APPLY'));

    await waitFor(() => {
      expect(setFilters).toHaveBeenCalledWith(DEFAULT_FILTERS);
    });
  });
});
