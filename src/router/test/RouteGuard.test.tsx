import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../utils/test-helpers/TestWrapper';
import { AuthBootstrapContext } from '../AuthBootstrapContext';
import RouteGuard from '../RouteGuard';

const { mockDispatch, mockUseAuth, mockUseCustomParams } = vi.hoisted(() => ({
  mockDispatch: vi.fn(),
  mockUseAuth: vi.fn(),
  mockUseCustomParams: vi.fn(),
}));

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return { ...actual, useDispatch: () => mockDispatch };
});

vi.mock('../../hooks', () => ({
  useAuth: mockUseAuth,
  useCustomParams: mockUseCustomParams,
}));

const renderGuard = (
  authorization: 'public' | 'user',
  bootstrap: { hasRetryableError: boolean; retry: () => void } = {
    hasRetryableError: false,
    retry: vi.fn(),
  }
) =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <AuthBootstrapContext.Provider value={bootstrap}>
          <RouteGuard authorization={authorization}>
            <div>Route content</div>
          </RouteGuard>
        </AuthBootstrapContext.Provider>
      </TestWrapper>
    </MemoryRouter>
  );

describe('RouteGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCustomParams.mockReturnValue({ teamId: undefined, orgId: undefined });
    mockUseAuth.mockReturnValue({
      isTeamAdmin: false,
      isSiteAdmin: false,
      isTeamAuth: false,
      isOrgAuth: false,
      isAuth: false,
      authInitialized: false,
    });
  });

  it('renders public content while auth is initializing', () => {
    renderGuard('public');

    expect(screen.getByText('Route content')).toBeInTheDocument();
    expect(screen.queryByText(/checking authentication/i)).not.toBeInTheDocument();
  });

  it('waits for auth initialization on protected routes', () => {
    renderGuard('user');

    expect(screen.getByText(/checking authentication/i)).toBeInTheDocument();
    expect(screen.queryByText('Route content')).not.toBeInTheDocument();
  });

  it('offers retry after a retryable auth initialization error', async () => {
    const retry = vi.fn();
    renderGuard('user', { hasRetryableError: true, retry });

    screen.getByRole('button', { name: /retry/i }).click();

    expect(retry).toHaveBeenCalledOnce();
    expect(screen.getByText(/unable to verify your session/i)).toBeInTheDocument();
  });
});
