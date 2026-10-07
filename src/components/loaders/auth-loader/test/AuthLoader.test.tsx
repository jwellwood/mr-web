import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import AuthLoader from '../AuthLoader';

describe('AuthLoader', () => {
  it('renders the checking authentication text', () => {
    render(
      <TestWrapper>
        <AuthLoader />
      </TestWrapper>
    );
    expect(screen.getByText(/checking authentication/i)).toBeInTheDocument();
  });

  it('renders a spinner element', () => {
    const { container } = render(
      <TestWrapper>
        <AuthLoader />
      </TestWrapper>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('offers retry and sign out when the session check fails', () => {
    const onRetry = vi.fn();
    const onSignOut = vi.fn();
    render(
      <TestWrapper>
        <AuthLoader onRetry={onRetry} onSignOut={onSignOut} />
      </TestWrapper>
    );

    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    fireEvent.click(screen.getByRole('button', { name: /sign out/i }));

    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(onSignOut).toHaveBeenCalledTimes(1);
  });
});
