import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import SignInPage from '../SignInPage';

vi.mock('react-turnstile', () => ({
  Turnstile: vi.fn(() => <div data-testid="turnstile-widget" />),
}));

const noop = vi.fn();

describe('SignInPage', () => {
  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <SignInPage loading={false} onSubmit={noop} showResendLink={false} email={null} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders the sign-in form', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <SignInPage loading={false} onSubmit={noop} showResendLink={false} email={null} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders the authorization links', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <SignInPage loading={false} onSubmit={noop} showResendLink={false} email={null} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument();
    expect(screen.getByText('Forgotten your password?')).toBeInTheDocument();
  });

  it('does not render the resend verification section by default', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <SignInPage loading={false} onSubmit={noop} showResendLink={false} email={null} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.queryByText('Resend Verification Link')).not.toBeInTheDocument();
  });

  it('renders the resend verification section when showResendLink is true', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <SignInPage
            loading={false}
            onSubmit={noop}
            showResendLink={true}
            email="user@example.com"
          />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Resend Verification Link')).toBeInTheDocument();
  });
});
