import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetUseMutationImpl, setUseMutationImpl } from '../../../../test/utils/mockUseMutation';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import SignInContainer from '../SignIn';

vi.mock('react-turnstile', () => ({
  Turnstile: vi.fn(() => <div data-testid="turnstile-widget" />),
}));

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
  return { ...actual, useNavigate: () => mockNavigate };
});

const renderComponent = () =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <SignInContainer />
      </TestWrapper>
    </MemoryRouter>
  );

describe('SignInContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setUseMutationImpl(() => [async () => undefined, { loading: false }]);
  });

  afterEach(() => {
    resetUseMutationImpl();
  });

  it('renders the email and password form inputs', () => {
    renderComponent();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('shows a spinner and hides inputs when the mutation is loading', () => {
    setUseMutationImpl(() => [async () => undefined, { loading: true }]);
    renderComponent();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByLabelText('Email Address')).not.toBeInTheDocument();
  });

  it('calls the mutation with the correct credentials on form submit', async () => {
    const mutationFn = vi.fn(async () => undefined);
    setUseMutationImpl(() => [mutationFn, { loading: false }]);
    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByLabelText('Email Address'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'Secret123');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mutationFn).toHaveBeenCalledWith({
        variables: { email: 'test@example.com', password: 'Secret123' },
      });
    });
  });

  it('shows the resend verification section when the mutation rejects with Unverified User', async () => {
    setUseMutationImpl(() => [
      async () => Promise.reject({ message: 'Unverified User' }),
      { loading: false },
    ]);
    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByLabelText('Email Address'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'Secret123');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Resend Verification Link' })).toBeInTheDocument();
    });
  });
});
