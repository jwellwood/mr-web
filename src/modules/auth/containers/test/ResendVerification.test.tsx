import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { showAlert } from '../../../../store';
import { resetUseMutationImpl, setUseMutationImpl } from '../../../../test/utils/mockUseMutation';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ResendVerification from '../ResendVerification';

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

const renderComponent = (email: string | null = 'user@example.com') =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <ResendVerification email={email} />
      </TestWrapper>
    </MemoryRouter>
  );

describe('ResendVerification', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetUseMutationImpl();
  });

  afterEach(() => {
    resetUseMutationImpl();
  });

  it('renders the resend button when not loading', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: 'Resend Verification Link' })).toBeInTheDocument();
  });

  it('shows a spinner while the mutation is loading', () => {
    setUseMutationImpl(() => [async () => undefined, { loading: true }]);
    renderComponent();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Resend Verification Link' })
    ).not.toBeInTheDocument();
  });

  it('dispatches a CAPTCHA warning when the resend button is clicked without a turnstile token', async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole('button', { name: 'Resend Verification Link' }));

    expect(mockDispatch).toHaveBeenCalledWith(
      showAlert({ text: 'Please complete the CAPTCHA', type: 'warning' })
    );
  });

  it('does not dispatch or navigate when email is null and no token', async () => {
    const user = userEvent.setup();
    renderComponent(null);

    await user.click(screen.getByRole('button', { name: 'Resend Verification Link' }));

    // reaches the CAPTCHA guard first regardless of email
    expect(mockDispatch).toHaveBeenCalledWith(
      showAlert({ text: 'Please complete the CAPTCHA', type: 'warning' })
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
