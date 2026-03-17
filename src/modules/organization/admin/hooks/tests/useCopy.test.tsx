import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCopy } from '../useCopy';

const mockDispatch = vi.fn();
let writeTextMock: ReturnType<typeof vi.fn>;

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

function HookHarness({ text }: { text: string }) {
  const { copied, onCopy } = useCopy(text);

  return (
    <div>
      <span>{copied ? 'copied' : 'not-copied'}</span>
      <button onClick={() => void onCopy()}>copy</button>
    </div>
  );
}

describe('useCopy', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    writeTextMock = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: writeTextMock,
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('copies text, dispatches success alert and resets copied after timeout', async () => {
    render(<HookHarness text="admin-code" />);

    fireEvent.click(screen.getByRole('button', { name: 'copy' }));

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('admin-code');
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: expect.stringContaining('showAlert'),
          payload: { text: 'Text copied to clipboard', type: 'success' },
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText('copied')).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(screen.getByText('not-copied')).toBeInTheDocument();
      },
      { timeout: 2600 }
    );
  });

  it('dispatches error alert when copy fails', async () => {
    writeTextMock.mockRejectedValueOnce(new Error('denied'));

    render(<HookHarness text="admin-code" />);

    fireEvent.click(screen.getByRole('button', { name: 'copy' }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: expect.stringContaining('showAlert'),
          payload: { text: 'Failed to copy text to clipboard', type: 'error' },
        })
      );
    });
    expect(screen.getByText('not-copied')).toBeInTheDocument();
  });

  it('does nothing when text is empty', async () => {
    render(<HookHarness text="" />);

    fireEvent.click(screen.getByRole('button', { name: 'copy' }));

    expect(writeTextMock).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(screen.getByText('not-copied')).toBeInTheDocument();
  });
});
