import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import ForgotPasswordForm from '../ForgotPasswordForm';
import { forgotPasswordFormState } from '../schema';

const defaultProps = {
  defaultValues: forgotPasswordFormState,
  onSubmit: vi.fn(),
  loading: false,
};

describe('ForgotPasswordForm', () => {
  it('renders the email field', () => {
    render(
      <TestWrapper>
        <ForgotPasswordForm {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('has the submit button disabled when email is empty', () => {
    render(
      <TestWrapper>
        <ForgotPasswordForm {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('enables the submit button when a valid email is entered', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <ForgotPasswordForm {...defaultProps} />
      </TestWrapper>
    );

    await user.type(screen.getByLabelText('Email Address'), 'user@example.com');

    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled();
  });

  it('calls onSubmit with the email when submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <ForgotPasswordForm {...defaultProps} onSubmit={onSubmit} />
      </TestWrapper>
    );

    await user.type(screen.getByLabelText('Email Address'), 'user@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ email: 'user@example.com' }, undefined);
    });
  });
});
