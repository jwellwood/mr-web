import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import i18n from '../../i18n/react-i18n';
import { resetAuth, showAlert } from '../../store';
import { resetUseMutationImpl } from '../../test/utils/mockUseMutation';
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

const wrapper = ({ children }: { children: ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('useLogout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetUseMutationImpl();
  });

  afterEach(() => {
    resetUseMutationImpl();
  });

  it('removes the auth token on logout', async () => {
    const { result } = renderHook(() => useLogout(), { wrapper });
    await result.current.onLogout();
    expect(mockRemoveToken).toHaveBeenCalledOnce();
  });

  it('clears the Apollo store on logout', async () => {
    const { result } = renderHook(() => useLogout(), { wrapper });
    await result.current.onLogout();
    expect(mockClearStore).toHaveBeenCalledOnce();
  });

  it('dispatches resetAuth before clearing the store', async () => {
    const { result } = renderHook(() => useLogout(), { wrapper });
    await result.current.onLogout();
    expect(mockDispatch).toHaveBeenCalledWith(resetAuth());
  });

  it('dispatches a success alert after logout', async () => {
    const { result } = renderHook(() => useLogout(), { wrapper });
    await result.current.onLogout();
    expect(mockDispatch).toHaveBeenCalledWith(
      showAlert({ text: 'HOOKS.LOGOUT.SUCCESS', type: 'success' })
    );
  });
});
