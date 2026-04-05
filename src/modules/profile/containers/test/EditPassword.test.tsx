import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
const mockDispatch = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});
import { describe, it, expect, vi, afterEach } from 'vitest';
import { setUseMutationImpl, resetUseMutationImpl } from '../../../../test/utils/mockUseMutation';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import EditPassword from '../EditPassword';

// ensure default impl at test load
resetUseMutationImpl();

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('ChangePasswordContainer', () => {
  afterEach(() => {
    vi.clearAllMocks();
    resetUseMutationImpl();
    mockDispatch.mockClear();
  });

  it('dispatches showAlert with backend error message', () => {
    // set mutationImpl to trigger onError
    setUseMutationImpl(
      (_gql: unknown, options?: { onError?: (err: { message?: string }) => void }) => {
        options?.onError?.({ message: 'Incorrect current password' });
        return [async () => undefined, { loading: false }];
      }
    );

    render(
      <TestWrapper>
        <EditPassword />
      </TestWrapper>
    );

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'alert/showAlert',
        payload: {
          text: 'There was an error changing your password. Please try again.',
          type: 'error',
        },
      })
    );
  });

  it('happy path: dispatches success alert and navigates on success', async () => {
    // set mutationImpl to return a mutation function that resolves
    const mutationFn = vi.fn(() => Promise.resolve({}));
    setUseMutationImpl(() => [
      mutationFn as unknown as (...args: unknown[]) => Promise<unknown>,
      { loading: false },
    ]);

    render(
      <TestWrapper>
        <EditPassword />
      </TestWrapper>
    );

    const user = userEvent.setup();
    const password = screen.getByLabelText(/current password/i);
    const newPassword = screen.getByLabelText(/^New Password$/i);
    const confirm = screen.getByLabelText(/^Confirm New Password$/i);
    const submit = screen.getByRole('button', { name: /submit/i });

    await user.type(password, 'oldpass');
    await user.type(newPassword, 'abcdef');
    await user.type(confirm, 'abcdef');

    await waitFor(() => expect(submit).toBeEnabled());

    await user.click(submit);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({ text: 'Password changed!' }),
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith('/profile');
    });
  });
});
