import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it, expect } from 'vitest';
import CustomButton from '../custom-button/CustomButton';

describe('CustomButton', () => {
  it('renders with children text', () => {
    render(<CustomButton>Click Me</CustomButton>);

    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<CustomButton onClick={handleClick}>Click Me</CustomButton>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with correct variant', () => {
    const { container } = render(<CustomButton variant="contained">Click Me</CustomButton>);

    const button = container.querySelector('.MuiButton-contained');
    expect(button).toBeInTheDocument();
  });

  it('renders with correct color', () => {
    const { container } = render(<CustomButton color="secondary">Click Me</CustomButton>);

    const button = container.querySelector('.MuiButton-colorSecondary');
    expect(button).toBeInTheDocument();
  });
});
