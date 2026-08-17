import { act, renderHook } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { showAlert } from '../../store';
import { useCopy } from '../useCopy';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');

  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

const mockedUseDispatch = vi.mocked(useDispatch);

describe('useCopy', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockedUseDispatch.mockReturnValue(vi.fn());
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
      configurable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('does nothing when the text is empty', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    const { result } = renderHook(() => useCopy(''));

    await act(async () => {
      await result.current.onCopy();
    });

    expect(writeText).not.toHaveBeenCalled();
    expect(result.current.copied).toBe(false);
  });

  it('copies text and dispatches a success alert when the clipboard write succeeds', async () => {
    const dispatch = vi.fn();
    mockedUseDispatch.mockReturnValue(dispatch);
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    const { result } = renderHook(() => useCopy('abc123'));

    await act(async () => {
      await result.current.onCopy();
    });

    expect(writeText).toHaveBeenCalledWith('abc123');
    expect(result.current.copied).toBe(true);
    expect(dispatch).toHaveBeenCalledWith(showAlert({ text: 'USE_COPY.SUCCESS', type: 'success' }));
  });

  it('dispatches an error alert and keeps copied false when copying fails', async () => {
    const dispatch = vi.fn();
    mockedUseDispatch.mockReturnValue(dispatch);
    const writeText = vi.fn().mockRejectedValue(new Error('copy failed'));
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    const { result } = renderHook(() => useCopy('abc123'));

    await act(async () => {
      await result.current.onCopy();
    });

    expect(writeText).toHaveBeenCalledWith('abc123');
    expect(result.current.copied).toBe(false);
    expect(dispatch).toHaveBeenCalledWith(showAlert({ text: 'USE_COPY.ERROR', type: 'error' }));
  });

  it('resets copied back to false after 2 seconds', async () => {
    const dispatch = vi.fn();
    mockedUseDispatch.mockReturnValue(dispatch);
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    const { result } = renderHook(() => useCopy('abc123'));

    await act(async () => {
      await result.current.onCopy();
    });

    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.copied).toBe(false);
  });
});
