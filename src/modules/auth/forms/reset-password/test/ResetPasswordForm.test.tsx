import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import ResetPasswordForm from '../ResetPasswordForm';
import { resetPasswordFormState } from '../schema';

const defaultProps = {
  defaultValues: resetPasswordFormState,
  onSubmit: vi.fn(),
  loading: false,
};

describe('ResetPasswordForm', () => {
  it('renders the new password and confirm password fields', () => {
    render(
      <TestWrapper>
        <ResetPasswordForm {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
  });

  it('has the submit button disabled when fields are empty', () => {
    render(
      <TestWrapper>
        <ResetPasswordForm {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('enables the submit button when matching valid passwords are entered', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <ResetPasswordForm {...defaultProps} />
      </TestWrapper>
    );

    await user.type(screen.getByLabelText('New Password'), 'secret123');
    await user.type(screen.getByLabelText('Confirm New Password'), 'secret123');

    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled();
  });

  it('keeps the submit button disabled when passwords do not match', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <ResetPasswordForm {...defaultProps} />
      </TestWrapper>
    );

    await user.type(screen.getByLabelText('New Password'), 'secret123');
    await user.type(screen.getByLabelText('Confirm New Password'), 'different1');

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('calls onSubmit with passwords when submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <ResetPasswordForm {...defaultProps} onSubmit={onSubmit} />
      </TestWrapper>
    );

    await user.type(screen.getByLabelText('New Password'), 'secret123');
    await user.type(screen.getByLabelText('Confirm New Password'), 'secret123');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { password: 'secret123', confirmPassword: 'secret123' },
        undefined
      );
    });
  });
});
