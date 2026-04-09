import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetAuth, showAlert } from '../../store';
import { resetUseMutationImpl, setUseMutationImpl } from '../../test/utils/mockUseMutation';
import { useLogout } from '../useLogout';

const { mockDispatch, mockClearStore, mockRemoveToken } = vi.hoisted(() => ({
  mockDispatch: vi.fn(),
  mockClearStore: vi.fn().mockResolvedValue(undefined),
  mockRemoveToken: vi.fn(),
}));

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return { ...actual, useDispatch: () => mockDispatch };
});

vi.mock('../../services/graphql/apolloClient', () => ({
  apolloClient: { clearStore: mockClearStore },
}));

vi.mock('../../utils', async () => {
  const actual = await vi.importActual<typeof import('../../utils')>('../../utils');
  return { ...actual, authStorage: { removeToken: mockRemoveToken, getToken: vi.fn() } };
});

describe('useLogout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetUseMutationImpl();
  });

  afterEach(() => {
    resetUseMutationImpl();
  });

  it('removes the auth token on logout', async () => {
    const { result } = renderHook(() => useLogout());
    await result.current.onLogout();
    expect(mockRemoveToken).toHaveBeenCalledOnce();
  });

  it('clears the Apollo store on logout', async () => {
    const { result } = renderHook(() => useLogout());
    await result.current.onLogout();
    expect(mockClearStore).toHaveBeenCalledOnce();
  });

  it('dispatches resetAuth before clearing the store', async () => {
    const { result } = renderHook(() => useLogout());
    await result.current.onLogout();
    expect(mockDispatch).toHaveBeenCalledWith(resetAuth());
  });

  it('dispatches a success alert after logout', async () => {
    const { result } = renderHook(() => useLogout());
    await result.current.onLogout();
    expect(mockDispatch).toHaveBeenCalledWith(
      showAlert({ text: 'You have logged out. Bye!', type: 'success' })
    );
  });

  it('still dispatches the success alert when the server logout mutation throws', async () => {
    setUseMutationImpl(() => [
      async () => {
        throw new Error('network error');
      },
      { loading: false },
    ]);

    const { result } = renderHook(() => useLogout());
    await result.current.onLogout();

    expect(mockDispatch).toHaveBeenCalledWith(
      showAlert({ text: 'You have logged out. Bye!', type: 'success' })
    );
    // Local cleanup should still have happened
    expect(mockRemoveToken).toHaveBeenCalledOnce();
    expect(mockClearStore).toHaveBeenCalledOnce();
  });
});
