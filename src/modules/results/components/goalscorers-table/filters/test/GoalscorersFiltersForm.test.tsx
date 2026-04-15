import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../../../utils/test-helpers/TestWrapper';
import { GoalscorersContext, TGoalscorersFilters } from '../../../../context';
import GoalscorersFiltersForm from '../GoalscorersFiltersForm';

vi.mock('react-i18next', async importOriginal => {
  const actual = await importOriginal<typeof import('react-i18next')>();
  return { ...actual, useTranslation: () => ({ t: (key: string) => key }) };
});

const competitionOptions = [
  { label: 'All Competitions', value: 'all' },
  { label: 'League A', value: 'comp-1' },
];

const defaultValues: TGoalscorersFilters = { competitionId: 'all' };

function renderForm({
  onSubmit = vi.fn(),
  onReset = vi.fn(),
}: {
  onSubmit?: (values: TGoalscorersFilters) => void;
  onReset?: () => void;
} = {}) {
  return render(
    <TestWrapper>
      <GoalscorersContext.Provider
        value={{ filters: { competitionId: 'all' }, setFilters: vi.fn() }}
      >
        <GoalscorersFiltersForm
          onSubmit={onSubmit}
          onReset={onReset}
          defaultValues={defaultValues}
          competitionOptions={competitionOptions}
        />
      </GoalscorersContext.Provider>
    </TestWrapper>
  );
}

describe('GoalscorersFiltersForm', () => {
  it('renders the filter display chip', () => {
    renderForm();

    expect(screen.getByText('FILTERS.ALL_COMPETITIONS')).toBeInTheDocument();
  });

  it('opens the modal when the display is clicked', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByText('FILTERS.ALL_COMPETITIONS'));

    expect(screen.getByText('FILTERS.TITLE')).toBeInTheDocument();
    expect(screen.getByText('FILTERS.COMPETITIONS')).toBeInTheDocument();
  });

  it('calls onSubmit with the current filter values when Apply is clicked', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    renderForm({ onSubmit });

    await user.click(screen.getByText('FILTERS.ALL_COMPETITIONS'));
    await user.click(screen.getByText('FORM.BUTTONS.APPLY'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ competitionId: 'all' });
    });
  });

  it('closes the modal after a successful submission', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByText('FILTERS.ALL_COMPETITIONS'));
    expect(screen.getByText('FILTERS.TITLE')).toBeInTheDocument();

    await user.click(screen.getByText('FORM.BUTTONS.APPLY'));

    await waitFor(() => {
      expect(screen.queryByText('FILTERS.TITLE')).not.toBeInTheDocument();
    });
  });

  it('calls onReset when the reset icon is clicked', async () => {
    const onReset = vi.fn();
    const user = userEvent.setup();
    renderForm({ onReset });

    await user.click(screen.getByText('FILTERS.ALL_COMPETITIONS'));
    await user.click(screen.getByTestId('reset-icon'));

    expect(onReset).toHaveBeenCalled();
  });
});
