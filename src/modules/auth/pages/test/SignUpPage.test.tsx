import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import SignUpPage from '../SignUpPage';

vi.mock('react-turnstile', () => ({
  Turnstile: vi.fn(() => <div data-testid="turnstile-widget" />),
}));

const noop = vi.fn();

describe('SignUpPage', () => {
  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <SignUpPage loading={false} onSubmit={noop} email={null} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('renders the sign-up form when email is null', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <SignUpPage loading={false} onSubmit={noop} email={null} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('shows the email confirmation alert instead of the form once email is set', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <SignUpPage loading={false} onSubmit={noop} email="user@example.com" />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.queryByLabelText('Username')).not.toBeInTheDocument();
    expect(
      screen.getByText(/validation email has been sent to user@example.com/i)
    ).toBeInTheDocument();
  });

  it('renders the "Already have an account?" authorization link', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <SignUpPage loading={false} onSubmit={noop} email={null} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Sign in here')).toBeInTheDocument();
  });
});
