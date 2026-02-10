import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it, expect } from 'vitest';
import CustomIconButton from '../custom-icon-button/CustomIconButton';

describe('CustomIconButton', () => {
  it('renders the icon button', () => {
    const handleClick = vi.fn();
    render(<CustomIconButton icon="menu" onClick={handleClick} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<CustomIconButton icon="menu" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('passes event object to onClick handler', () => {
    const handleClick = vi.fn();
    render(<CustomIconButton icon="menu" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
  });

  it('renders with custom size', () => {
    const handleClick = vi.fn();
    render(<CustomIconButton icon="menu" size="2rem" onClick={handleClick} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    const handleClick = vi.fn();
    render(<CustomIconButton icon="menu" color="#ff0000" onClick={handleClick} />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ color: '#ff0000' });
  });
});
