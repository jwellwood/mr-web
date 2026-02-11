import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import NavMenu from '../NavMenu';

const mockOnLogout = vi.fn();

// mutable mock state so tests can toggle authentication
const mockAuthState = { isAuth: true } as { isAuth: boolean };

vi.mock('../../../../hooks', () => ({
  useAuth: () => mockAuthState,
  useLogout: () => ({ onLogout: mockOnLogout }),
}));

describe('NavMenu', () => {
  beforeEach(() => {
    mockOnLogout.mockClear();
  });

  it('renders avatar initials when username provided', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <NavMenu username="John Doe" />
        </MemoryRouter>
      </TestWrapper>
    );

    // Initials for John Doe => JD
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('opens menu and shows links and sign out when clicked', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <MemoryRouter>
          <NavMenu username="Jane Smith" />
        </MemoryRouter>
      </TestWrapper>
    );

    // Click avatar to open menu
    const avatar = screen.getByText('JS');
    await user.click(avatar);

    // Menu should show Home and Profile links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();

    // Sign out button should be present for authenticated users
    const signOut = screen.getByRole('button', { name: /sign out/i });
    expect(signOut).toBeInTheDocument();

    await user.click(signOut);
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it('does not show sign out when user is not authenticated', async () => {
    const user = userEvent.setup();
    // Set unauthenticated state
    mockAuthState.isAuth = false;

    render(
      <TestWrapper>
        <MemoryRouter>
          <NavMenu username="Unauth User" />
        </MemoryRouter>
      </TestWrapper>
    );

    const avatar = screen.getByText('UU');
    await user.click(avatar);

    // Home and Profile links should still be present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();

    // Sign out button should NOT be present
    expect(screen.queryByRole('button', { name: /sign out/i })).not.toBeInTheDocument();

    // restore auth state for other tests
    mockAuthState.isAuth = true;
  });
});
