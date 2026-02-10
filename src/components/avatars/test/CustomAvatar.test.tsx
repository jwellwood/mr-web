import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import CustomAvatar from '../custom-avatar/CustomAvatar';

describe('CustomAvatar', () => {
  it('renders children when not loading', () => {
    render(<CustomAvatar>AB</CustomAvatar>);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('does not render children when loading', () => {
    render(<CustomAvatar loading>AB</CustomAvatar>);
    expect(screen.queryByText('AB')).not.toBeInTheDocument();
  });

  it('calls onClick when avatar is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<CustomAvatar onClick={handleClick}>ClickMe</CustomAvatar>);

    const node = screen.getByText('ClickMe');
    await user.click(node);
    expect(handleClick).toHaveBeenCalled();
  });
});
