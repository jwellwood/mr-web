import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { showAlert } from '../../../../store';
import { resetUseMutationImpl, setUseMutationImpl } from '../../../../test/utils/mockUseMutation';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ResetPasswordContainer from '../ResetPassword';

const { mockDispatch, mockNavigate } = vi.hoisted(() => ({
  mockDispatch: vi.fn(),
  mockNavigate: vi.fn(),
}));

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return { ...actual, useDispatch: () => mockDispatch };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ token: 'reset-token-abc' }),
  };
});

const renderComponent = () =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <ResetPasswordContainer />
      </TestWrapper>
    </MemoryRouter>
  );

describe('ResetPasswordContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setUseMutationImpl(() => [async () => undefined, { loading: false }]);
  });

  afterEach(() => {
    resetUseMutationImpl();
  });

  it('renders the New Password and Confirm New Password inputs', () => {
    renderComponent();
    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
  });

  it('shows a spinner and hides inputs when the mutation is loading', () => {
    setUseMutationImpl(() => [async () => undefined, { loading: true }]);
    renderComponent();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByLabelText('New Password')).not.toBeInTheDocument();
  });

  it('calls the mutation with the correct password and URL token on form submit', async () => {
    const mutationFn = vi.fn(async () => undefined);
    setUseMutationImpl(() => [mutationFn, { loading: false }]);
    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByLabelText('New Password'), 'NewSecure1');
    await user.type(screen.getByLabelText('Confirm New Password'), 'NewSecure1');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mutationFn).toHaveBeenCalledWith({
        variables: { password: 'NewSecure1', token: 'reset-token-abc' },
      });
    });
  });

  it('navigates to sign-in and dispatches success alert after mutation resolves', async () => {
    setUseMutationImpl(() => [async () => ({ data: {} }), { loading: false }]);
    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByLabelText('New Password'), 'NewSecure1');
    await user.type(screen.getByLabelText('Confirm New Password'), 'NewSecure1');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/sign_in');
      expect(mockDispatch).toHaveBeenCalledWith(
        showAlert({
          text: 'Password reset successfully. Use the new password to sign in.',
          type: 'success',
        })
      );
    });
  });
});
