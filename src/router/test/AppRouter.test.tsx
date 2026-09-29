import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { resetAuth, setAuth, authPayloadFromUser } from '../../store';
import TestWrapper from '../../utils/test-helpers/TestWrapper';
import AppRouter from '../AppRouter';

const { mockDispatch, mockGetToken, mockRemoveToken, mockRefetch, mockUseQuery } = vi.hoisted(
  () => ({
    mockDispatch: vi.fn(),
    mockGetToken: vi.fn(),
    mockRemoveToken: vi.fn(),
    mockRefetch: vi.fn(),
    mockUseQuery: vi.fn(),
  })
);

vi.mock('@apollo/client/react', async () => {
  const actual =
    await vi.importActual<typeof import('@apollo/client/react')>('@apollo/client/react');
  return { ...actual, useQuery: mockUseQuery };
});

vi.mock('@apollo/client/errors', () => ({
  CombinedGraphQLErrors: {
    is: (error: { kind?: string }) => error?.kind === 'graphql',
  },
  ServerError: {
    is: (error: { kind?: string }) => error?.kind === 'server',
  },
}));

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return { ...actual, useDispatch: () => mockDispatch };
});

vi.mock('../../utils', async () => {
  const actual = await vi.importActual<typeof import('../../utils')>('../../utils');
  return {
    ...actual,
    authStorage: { getToken: mockGetToken, removeToken: mockRemoveToken },
  };
});

vi.mock('../routes/Routes', async () => {
  const React = await import('react');
  const { AuthBootstrapContext } = await import('../AuthBootstrapContext');
  function MockRoutes() {
    const { hasRetryableError, retry } = React.useContext(AuthBootstrapContext);
    return (
      <>
        <div>Routes loaded</div>
        {hasRetryableError && <button onClick={retry}>Retry bootstrap</button>}
      </>
    );
  }
  return { default: MockRoutes };
});

const renderApp = () =>
  render(
    <TestWrapper>
      <AppRouter />
    </TestWrapper>
  );

describe('AppRouter auth bootstrap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetToken.mockReturnValue('token');
    mockUseQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      loading: true,
      refetch: mockRefetch,
    });
  });

  it('initializes auth from a fetched user', async () => {
    const user = {
      username: 'test-user',
      roles: ['user'],
      teamIds: [],
      orgIds: [],
    };
    mockUseQuery.mockReturnValue({
      data: { user },
      error: undefined,
      loading: false,
      refetch: mockRefetch,
    });

    renderApp();

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(setAuth(authPayloadFromUser(user)));
    });
    expect(mockRemoveToken).not.toHaveBeenCalled();
  });

  it('marks auth initialized when there is no token', async () => {
    mockGetToken.mockReturnValue(null);

    renderApp();

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(resetAuth());
    });
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ skip: true })
    );
  });

  it('removes the token when the server confirms the credential is invalid', async () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      error: { kind: 'graphql', errors: [{ extensions: { code: 'UNAUTHENTICATED' } }] },
      loading: false,
      refetch: mockRefetch,
    });

    renderApp();

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(resetAuth());
      expect(mockRemoveToken).toHaveBeenCalledOnce();
    });
  });

  it('preserves the token and offers retry after a transient failure', async () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      error: new Error('Network unavailable'),
      loading: false,
      refetch: mockRefetch,
    });

    renderApp();

    const retryButton = await screen.findByRole('button', { name: /retry/i });
    expect(mockRemoveToken).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalledWith(resetAuth());

    fireEvent.click(retryButton);

    expect(mockRefetch).toHaveBeenCalledOnce();
  });
});
