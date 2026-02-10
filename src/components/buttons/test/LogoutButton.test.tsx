import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it, expect } from 'vitest';
import LogoutButton from '../logout-button/LogoutButton';

describe('LogoutButton', () => {
  it('renders the logout button', () => {
    const handleClick = vi.fn();
    render(<LogoutButton onClick={handleClick} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<LogoutButton onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with text variant', () => {
    const handleClick = vi.fn();
    const { container } = render(<LogoutButton onClick={handleClick} />);

    const button = container.querySelector('.MuiButton-text');
    expect(button).toBeInTheDocument();
  });

  it('displays the sign out text', () => {
    const handleClick = vi.fn();
    render(<LogoutButton onClick={handleClick} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
