import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetUseMutationImpl, setUseMutationImpl } from '../../../../test/utils/mockUseMutation';
import '@testing-library/jest-dom';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ValidatedEmailContainer from '../ValidatedEmail';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useParams: () => ({ token: 'verify-token-xyz' }) };
});

const renderComponent = () =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <ValidatedEmailContainer />
      </TestWrapper>
    </MemoryRouter>
  );

describe('ValidatedEmailContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setUseMutationImpl(() => [async () => undefined, { loading: false }]);
  });

  afterEach(() => {
    resetUseMutationImpl();
  });

  it('calls verifyEmail on mount with the token from URL params', async () => {
    const mockVerifyEmail = vi.fn(async () => undefined);
    setUseMutationImpl(() => [mockVerifyEmail, { loading: false }]);
    renderComponent();

    await waitFor(() => {
      expect(mockVerifyEmail).toHaveBeenCalledWith({ variables: { token: 'verify-token-xyz' } });
    });
  });

  it('shows a spinner while the mutation is loading', () => {
    setUseMutationImpl(() => [async () => undefined, { loading: true }]);
    renderComponent();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows "Email verification failed" when data has no verified email', () => {
    // loading=false, no data → ValidatedEmail renders error state
    setUseMutationImpl(() => [async () => undefined, { loading: false }]);
    renderComponent();
    expect(screen.getByText('Email verification failed')).toBeInTheDocument();
  });

  it('shows "Email verified successfully" when mutation data contains a verified email', () => {
    setUseMutationImpl(() => [
      async () => undefined,
      {
        loading: false,
        data: { VERIFY_EMAIL: { email: 'user@example.com' } },
      } as { loading?: boolean },
    ]);
    renderComponent();
    expect(screen.getByText('Email verified successfully')).toBeInTheDocument();
  });
});
