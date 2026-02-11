import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import MutationError from '../mutation-error/MutationError';

describe('MutationError', () => {
  test('renders error message', () => {
    const mockError = { message: 'Mutation failed' };
    render(<MutationError error={mockError} />);

    expect(screen.getByText('Mutation failed')).toBeInTheDocument();
  });

  test('displays default message when error message is empty', () => {
    const mockError = { message: '' };
    render(<MutationError error={mockError} />);

    expect(screen.getByText('Something went wrong. Please try again later.')).toBeInTheDocument();
  });

  test('displays default message when error message is undefined', () => {
    const mockError = { message: '' };
    render(<MutationError error={mockError} />);

    expect(screen.getByText('Something went wrong. Please try again later.')).toBeInTheDocument();
  });

  test('renders as warning alert', () => {
    const mockError = { message: 'Test error' };
    const { container } = render(<MutationError error={mockError} />);

    const alert = container.querySelector('[class*="MuiAlert"]');
    expect(alert).toBeInTheDocument();
  });

  test('renders with typography styling', () => {
    const mockError = { message: 'Styled error' };
    render(<MutationError error={mockError} />);

    const text = screen.getByText('Styled error');
    expect(text).toHaveStyle({ textDecoration: 'none' });
  });

  test('renders different error messages', () => {
    const errorMessages = [
      'Failed to create item',
      'Update operation failed',
      'Delete operation failed',
      'Validation error',
    ];

    errorMessages.forEach(message => {
      const { rerender } = render(<MutationError error={{ message }} />);
      expect(screen.getByText(message)).toBeInTheDocument();
      rerender(<MutationError error={{ message: 'new' }} />);
    });
  });

  test('handles GraphQL error messages', () => {
    const mockError = { message: 'GraphQL error: Field not found' };
    render(<MutationError error={mockError} />);

    expect(screen.getByText('GraphQL error: Field not found')).toBeInTheDocument();
  });

  test('handles network error messages', () => {
    const mockError = { message: 'Network error: Failed to fetch' };
    render(<MutationError error={mockError} />);

    expect(screen.getByText('Network error: Failed to fetch')).toBeInTheDocument();
  });

  test('handles long error messages', () => {
    const longMessage =
      'This is a very long error message that describes in detail what went wrong during the mutation operation and provides helpful information';
    const mockError = { message: longMessage };
    render(<MutationError error={mockError} />);

    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  test('renders alert with correct severity', () => {
    const mockError = { message: 'Test' };
    const { container } = render(<MutationError error={mockError} />);

    const alert = container.querySelector('[class*="MuiAlert-standardWarning"]');
    expect(alert).toBeInTheDocument();
  });
});
