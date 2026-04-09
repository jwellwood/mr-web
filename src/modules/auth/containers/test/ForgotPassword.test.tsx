import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { showAlert } from '../../../../store';
import { resetUseMutationImpl, setUseMutationImpl } from '../../../../test/utils/mockUseMutation';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ForgotPasswordContainer from '../ForgotPassword';

// Mock the Turnstile widget so we can simulate a token being provided
vi.mock('../../components/Turnstile', () => ({
  default: ({ onVerify }: { onVerify?: (token: string) => void }) => (
    <button data-testid="captcha-btn" onClick={() => onVerify?.('test-token')}>
      Complete CAPTCHA
    </button>
  ),
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
        <ForgotPasswordContainer />
      </TestWrapper>
    </MemoryRouter>
  );

describe('ForgotPasswordContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setUseMutationImpl(() => [async () => undefined, { loading: false }]);
  });

  afterEach(() => {
    resetUseMutationImpl();
  });

  it('renders the Forgot Password page title', () => {
    renderComponent();
    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
  });

  it('shows a spinner while there is no Turnstile token (loading={true})', () => {
    renderComponent();
    // loading={loading || !turnstileToken} = false || true = true → spinner shown
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByLabelText('Email Address')).not.toBeInTheDocument();
  });

  it('reveals the email input after the CAPTCHA token is provided', async () => {
    const user = userEvent.setup();
    renderComponent();

    // Initially the form is hidden behind the loading spinner
    expect(screen.queryByLabelText('Email Address')).not.toBeInTheDocument();

    // Simulate CAPTCHA completion
    await user.click(screen.getByTestId('captcha-btn'));

    await waitFor(() => {
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    });
  });

  it('navigates to sign-in and dispatches success alert on mutation success', async () => {
    setUseMutationImpl(() => [async () => ({ data: {} }), { loading: false }]);
    const user = userEvent.setup();
    renderComponent();

    // Set the token first so the form is accessible
    await user.click(screen.getByTestId('captcha-btn'));
    await waitFor(() => expect(screen.getByLabelText('Email Address')).toBeInTheDocument());

    await user.type(screen.getByLabelText('Email Address'), 'user@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/sign_in');
      expect(mockDispatch).toHaveBeenCalledWith(
        showAlert({ text: 'Email sent to user@example.com', type: 'success' })
      );
    });
  });
});
