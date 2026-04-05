import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../utils/test-helpers/TestWrapper';
import DeleteModal from '../delete-modal/DeleteModal';

describe('DeleteModal', () => {
  const defaultProps = {
    title: 'Player',
    loading: false,
    onDelete: vi.fn(),
  };

  it('renders the delete trigger with title', () => {
    render(
      <TestWrapper>
        <DeleteModal {...defaultProps} />
      </TestWrapper>
    );
    expect(screen.getByText('Delete Player')).toBeInTheDocument();
  });

  it('opens dialog when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <DeleteModal {...defaultProps} />
      </TestWrapper>
    );

    await user.click(screen.getByTestId('delete-modal-trigger'));
    expect(screen.getAllByText('Delete Player').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole('button', { name: /^delete$/i })).toBeInTheDocument();
  });

  it('shows cannot-be-undone warning in dialog', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <DeleteModal {...defaultProps} />
      </TestWrapper>
    );

    await user.click(screen.getByTestId('delete-modal-trigger'));
    expect(screen.getByText(/cannot be undone/i)).toBeInTheDocument();
  });

  it('calls onDelete when DELETE button is clicked', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <DeleteModal {...defaultProps} onDelete={onDelete} />
      </TestWrapper>
    );

    await user.click(screen.getByTestId('delete-modal-trigger'));
    await user.click(screen.getByRole('button', { name: /^delete$/i }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('disables DELETE button when disabled prop is true', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <DeleteModal {...defaultProps} disabled />
      </TestWrapper>
    );

    await user.click(screen.getByTestId('delete-modal-trigger'));
    expect(screen.getByRole('button', { name: /^delete$/i })).toBeDisabled();
  });

  it('shows spinner instead of warning text when loading', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <DeleteModal {...defaultProps} loading />
      </TestWrapper>
    );

    await user.click(screen.getByTestId('delete-modal-trigger'));
    expect(screen.queryByText(/cannot be undone/i)).not.toBeInTheDocument();
  });
});
