import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import { signUpFormState } from '../schema';
import SignUpForm from '../SignUpForm';

const defaultProps = {
  defaultValues: signUpFormState,
  onSubmit: vi.fn(),
  loading: false,
};

describe('SignUpForm', () => {
  it('renders the username, email, password fields and the terms switch', () => {
    render(
      <TestWrapper>
        <SignUpForm {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('has the submit button disabled when fields are empty', () => {
    render(
      <TestWrapper>
        <SignUpForm {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('enables the submit button when all valid values are entered', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <SignUpForm {...defaultProps} />
      </TestWrapper>
    );

    await user.type(screen.getByLabelText('Username'), 'john');
    await user.type(screen.getByLabelText('Email Address'), 'user@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.click(screen.getByRole('switch'));

    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled();
  });

  it('calls onSubmit with form data when submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <SignUpForm {...defaultProps} onSubmit={onSubmit} />
      </TestWrapper>
    );

    await user.type(screen.getByLabelText('Username'), 'john');
    await user.type(screen.getByLabelText('Email Address'), 'user@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.click(screen.getByRole('switch'));
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          username: 'john',
          email: 'user@example.com',
          password: 'secret123',
          acceptTerms: true,
        },
        undefined
      );
    });
  });
});
