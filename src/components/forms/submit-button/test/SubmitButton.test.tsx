import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import SubmitButton from '../SubmitButton';

describe('SubmitButton with confirmation', () => {
  it('shows confirmation modal when confirm prop is set and button is clicked', () => {
    render(
      <SubmitButton confirm={{ show: true, title: 'Are you sure?', content: 'Please confirm.' }}>
        Confirm Action
      </SubmitButton>
    );
    // Modal should not be visible initially
    expect(screen.queryByText(/are you sure\?/i)).not.toBeInTheDocument();
    // Click the trigger (parent div of the button)
    fireEvent.click(screen.getByText(/confirm action/i).parentElement!);
    // Modal should now be visible
    expect(screen.getByText(/are you sure\?/i)).toBeInTheDocument();
    expect(screen.getByText(/please confirm\./i)).toBeInTheDocument();
  });

  it('calls onClick only after confirming in modal', () => {
    const handleClick = vi.fn();
    render(
      <TestWrapper>
        <SubmitButton
          confirm={{ show: true, title: 'Confirm', content: 'Confirm this?' }}
          onClick={handleClick}
        >
          Confirm
        </SubmitButton>
      </TestWrapper>
    );
    // Click the trigger (parent div of the button)
    fireEvent.click(screen.getByText(/confirm/i).parentElement!);
    // onClick should not be called yet
    expect(handleClick).not.toHaveBeenCalled();
    // Click CONFIRM in modal
    fireEvent.click(screen.getByRole('button', { name: /^confirm$/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick if modal is closed without confirming', () => {
    const handleClick = vi.fn();
    render(
      <TestWrapper>
        <SubmitButton
          confirm={{ show: true, title: 'Confirm', content: 'Confirm this?' }}
          onClick={handleClick}
        >
          Confirm
        </SubmitButton>
      </TestWrapper>
    );
    // Open modal
    fireEvent.click(screen.getByText(/confirm/i).parentElement!);
    // Click Cancel button in modal
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);
    expect(handleClick).not.toHaveBeenCalled();
  });
});

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

  it('calls onClick handler when clicked (no confirmation)', () => {
    const handleClick = vi.fn();
    render(<SubmitButton onClick={handleClick}>Submit</SubmitButton>);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when confirmation is enabled and button is clicked (should require modal confirm)', () => {
    const handleClick = vi.fn();
    render(
      <SubmitButton
        confirm={{ show: true, title: 'Confirm', content: 'Confirm this?' }}
        onClick={handleClick}
      >
        Confirm
      </SubmitButton>
    );
    fireEvent.click(screen.getByText(/confirm/i).parentElement!);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders as a submit button type when confirmation is not enabled', () => {
    render(<SubmitButton />);
    expect(screen.getByRole('button', { name: /submit/i })).toHaveAttribute('type', 'submit');
  });

  it('renders as a button type when confirmation is enabled', () => {
    render(
      <SubmitButton confirm={{ show: true, title: 'Confirm', content: 'Confirm this?' }}>
        Confirm
      </SubmitButton>
    );
    expect(screen.getByRole('button', { name: /confirm/i })).toHaveAttribute('type', 'button');
  });
});
