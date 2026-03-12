import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SubmitButton from '../submit-button/SubmitButton';

describe('SubmitButton', () => {
  it('renders default "Submit" label when no children provided', () => {
    render(<SubmitButton />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('renders custom children label', () => {
    render(<SubmitButton>Save Changes</SubmitButton>);
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  it('renders disabled button when disabled prop is true', () => {
    render(<SubmitButton disabled>Submit</SubmitButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders skeleton instead of button when loading', () => {
    const { container } = render(<SubmitButton loading>Submit</SubmitButton>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(container.querySelector('[class*="MuiSkeleton"]')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<SubmitButton onClick={handleClick}>Submit</SubmitButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a submit button type', () => {
    render(<SubmitButton />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
