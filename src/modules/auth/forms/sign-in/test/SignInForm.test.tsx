import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import { signInFormState } from '../schema';
import SignInForm from '../SignInForm';

const defaultProps = {
  defaultValues: signInFormState,
  onSubmit: vi.fn(),
  loading: false,
};

describe('SignInForm', () => {
  it('renders the email and password fields', () => {
    render(
      <TestWrapper>
        <SignInForm {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('has the submit button disabled when fields are empty', () => {
    render(
      <TestWrapper>
        <SignInForm {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('enables the submit button when valid values are entered', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <SignInForm {...defaultProps} />
      </TestWrapper>
    );

    await user.type(screen.getByLabelText('Email Address'), 'user@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret');

    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled();
  });

  it('calls onSubmit with form data when submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <SignInForm {...defaultProps} onSubmit={onSubmit} />
      </TestWrapper>
    );

    await user.type(screen.getByLabelText('Email Address'), 'user@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { email: 'user@example.com', password: 'secret' },
        undefined
      );
    });
  });
});
