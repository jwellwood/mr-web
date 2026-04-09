import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import EmailVerifiedPage from '../EmailVerifiedPage';

describe('EmailVerifiedPage', () => {
  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EmailVerifiedPage loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Validation')).toBeInTheDocument();
  });

  it('shows a spinner when loading', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EmailVerifiedPage loading={true} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows the success message when data contains a verified email', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EmailVerifiedPage
            loading={false}
            data={{ VERIFY_EMAIL: { email: 'user@example.com' } }}
          />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Email verified successfully')).toBeInTheDocument();
  });

  it('shows the error message when data is null', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EmailVerifiedPage loading={false} data={null} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Email verification failed')).toBeInTheDocument();
  });

  it('shows a "Go to Sign In" link regardless of outcome', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EmailVerifiedPage loading={false} data={null} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Go to Sign In' })).toBeInTheDocument();
  });
});
