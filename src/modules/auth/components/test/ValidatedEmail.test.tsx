import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import { AUTH_PATHS } from '../../router';
import ValidatedEmail from '../ValidatedEmail.component';

describe('ValidatedEmail', () => {
  it('shows a success message when email verification succeeded', () => {
    const data = { VERIFY_EMAIL: { email: 'user@example.com' } };

    render(
      <TestWrapper>
        <MemoryRouter>
          <ValidatedEmail data={data} />
        </MemoryRouter>
      </TestWrapper>
    );

    expect(screen.getByText('Email verified successfully')).toBeInTheDocument();
  });

  it('shows an error message when verification failed', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <ValidatedEmail data={null} />
        </MemoryRouter>
      </TestWrapper>
    );

    expect(screen.getByText('Email verification failed')).toBeInTheDocument();
  });

  it('shows an error message when VERIFY_EMAIL is missing an email', () => {
    const data = { VERIFY_EMAIL: { email: null } };

    render(
      <TestWrapper>
        <MemoryRouter>
          <ValidatedEmail data={data as never} />
        </MemoryRouter>
      </TestWrapper>
    );

    expect(screen.getByText('Email verification failed')).toBeInTheDocument();
  });

  it('always renders a "Go to Sign In" button linking to the sign in page', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <ValidatedEmail data={null} />
        </MemoryRouter>
      </TestWrapper>
    );

    const btn = screen.getByRole('link', { name: 'Go to Sign In' });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('href', AUTH_PATHS.SIGN_IN);
  });
});
