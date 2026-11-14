import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import RequestAdminModal from '../RequestAdminModal';

describe('RequestAdminModal', () => {
  it('searches, selects a team, and closes only after a successful request', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    const onSubmit = vi.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true);

    render(
      <TestWrapper>
        <RequestAdminModal
          type="team"
          results={[{ id: 'team1', name: 'Rovers', city: 'London' }]}
          searchLoading={false}
          submitLoading={false}
          onSearch={onSearch}
          onSubmit={onSubmit}
        />
      </TestWrapper>
    );

    await user.click(screen.getByRole('button', { name: 'Team Admin Access' }));
    await user.type(screen.getByLabelText('Team name'), ' Rovers ');
    await user.click(screen.getByRole('button', { name: /^search$/i }));
    expect(onSearch).toHaveBeenCalledWith('Rovers');

    await user.click(screen.getByText('Rovers'));
    await user.type(screen.getByLabelText(/admin access code/i), 'secret1');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith('team1', 'secret1'));
    expect(screen.getByLabelText(/admin access code/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() =>
      expect(screen.queryByLabelText(/admin access code/i)).not.toBeInTheDocument()
    );
    expect(onSubmit).toHaveBeenCalledTimes(2);
  });

  it('requires a valid code and resets the selection when closed', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <TestWrapper>
        <RequestAdminModal
          type="team"
          results={[{ id: 'team1', name: 'Rovers' }]}
          searchLoading={false}
          submitLoading={false}
          onSearch={vi.fn()}
          onSubmit={onSubmit}
        />
      </TestWrapper>
    );

    await user.click(screen.getByRole('button', { name: 'Team Admin Access' }));
    await user.type(screen.getByLabelText('Team name'), 'Rovers');
    await user.click(screen.getByRole('button', { name: /^search$/i }));
    await user.click(screen.getByText('Rovers'));
    await user.type(screen.getByLabelText(/admin access code/i), 'short');
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
    expect(onSubmit).not.toHaveBeenCalled();

    await user.keyboard('{Escape}');
    await waitFor(() =>
      expect(screen.queryByLabelText(/admin access code/i)).not.toBeInTheDocument()
    );
    await user.click(await screen.findByRole('button', { name: 'Team Admin Access' }));
    expect(screen.getByLabelText('Team name')).toHaveValue('');
    expect(screen.queryByLabelText(/admin access code/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Rovers')).not.toBeInTheDocument();
  });

  it.each([
    {
      type: 'team' as const,
      button: 'Team Admin Access',
      label: 'Team name',
      empty: 'No teams found',
    },
    {
      type: 'org' as const,
      button: 'League Admin Access',
      label: 'League name',
      empty: 'No organizations found',
    },
  ])(
    'shows the empty result message after a $type search',
    async ({ type, button, label, empty }) => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <RequestAdminModal
            type={type}
            results={[]}
            searchLoading={false}
            submitLoading={false}
            onSearch={vi.fn()}
            onSubmit={vi.fn()}
          />
        </TestWrapper>
      );

      await user.click(screen.getByRole('button', { name: button }));
      expect(screen.queryByText(empty)).not.toBeInTheDocument();
      await user.type(screen.getByLabelText(label), 'Rovers');
      await user.click(screen.getByRole('button', { name: /^search$/i }));
      expect(await screen.findByText(empty)).toBeInTheDocument();
    }
  );
});
