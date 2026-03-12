import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../utils/test-helpers/TestWrapper';
import ConfirmationModal from '../confirmation-modal/ConfirmationModal';

describe('ConfirmationModal', () => {
  const defaultProps = {
    title: 'Delete record',
    loading: false,
    onConfirm: vi.fn(),
    btn: <button>Open</button>,
  };

  it('renders the trigger button element', () => {
    render(
      <TestWrapper>
        <ConfirmationModal {...defaultProps} />
      </TestWrapper>
    );
    expect(screen.getByRole('button', { name: /open/i })).toBeInTheDocument();
  });

  it('opens dialog with title when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ConfirmationModal {...defaultProps} />
      </TestWrapper>
    );

    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(screen.getByText('Delete record')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  it('renders optional children inside the dialog', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ConfirmationModal {...defaultProps}>Are you sure?</ConfirmationModal>
      </TestWrapper>
    );

    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('calls onConfirm when CONFIRM is clicked', async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ConfirmationModal {...defaultProps} onConfirm={onConfirm} />
      </TestWrapper>
    );

    await user.click(screen.getByRole('button', { name: /open/i }));
    await user.click(screen.getByRole('button', { name: /confirm/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('disables CONFIRM button when disabled prop is true', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ConfirmationModal {...defaultProps} disabled />
      </TestWrapper>
    );

    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(screen.getByRole('button', { name: /confirm/i })).toBeDisabled();
  });

  it('shows spinner instead of children when loading', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ConfirmationModal {...defaultProps} loading>
          Confirm action
        </ConfirmationModal>
      </TestWrapper>
    );

    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(screen.queryByText('Confirm action')).not.toBeInTheDocument();
  });
});
