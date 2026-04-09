import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { showAlert } from '../../../../store';
import { resetUseMutationImpl, setUseMutationImpl } from '../../../../test/utils/mockUseMutation';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import SignUpContainer from '../SignUp';

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
        <SignUpContainer />
      </TestWrapper>
    </MemoryRouter>
  );

/** Fill all required sign-up fields so the form becomes valid. */
const fillSignUpForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText('Username'), 'testuser');
  await user.type(screen.getByLabelText('Email Address'), 'test@example.com');
  await user.type(screen.getByLabelText('Password'), 'Secret123');
  // Toggle the acceptTerms switch (MUI Switch uses role="switch")
  await user.click(screen.getByRole('switch'));
};

describe('SignUpContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setUseMutationImpl(() => [async () => undefined, { loading: false }]);
  });

  afterEach(() => {
    resetUseMutationImpl();
  });

  it('renders the sign-up form inputs', () => {
    renderComponent();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('shows a spinner and hides the form when the mutation is loading', () => {
    setUseMutationImpl(() => [async () => undefined, { loading: true }]);
    renderComponent();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByLabelText('Username')).not.toBeInTheDocument();
  });

  it('dispatches a CAPTCHA warning when the form is submitted without a Turnstile token', async () => {
    const user = userEvent.setup();
    renderComponent();

    await fillSignUpForm(user);
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        showAlert({ text: 'Please complete the CAPTCHA', type: 'warning' })
      );
    });
  });
});
