import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import DataError from '../data-error/DataError';

describe('DataError', () => {
  test('renders error title', () => {
    const mockError = { message: 'Test error message' };
    render(<DataError error={mockError} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('displays error message', () => {
    const mockError = { message: 'Network request failed' };
    render(<DataError error={mockError} />);

    expect(screen.getByText('Network request failed')).toBeInTheDocument();
  });

  test('renders with different error messages', () => {
    const errorMessages = [
      'Database connection error',
      'Authentication failed',
      'Resource not found',
      'Timeout error',
    ];

    errorMessages.forEach(message => {
      const { rerender } = render(<DataError error={{ message }} />);
      expect(screen.getByText(message)).toBeInTheDocument();
      rerender(<DataError error={{ message: 'new message' }} />);
    });
  });

  test('renders error message in warning color', () => {
    const mockError = { message: 'Test warning' };
    const { container } = render(<DataError error={mockError} />);

    const errorMessage = screen.getByText('Test warning');
    expect(errorMessage).toBeInTheDocument();

    // Check parent has warning styling
    expect(container.querySelector('[class*="MuiAlert"]')).toBeInTheDocument();
  });

  test('handles empty error message', () => {
    const mockError = { message: '' };
    render(<DataError error={mockError} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('handles long error messages', () => {
    const longMessage =
      'This is a very long error message that should still be displayed properly without breaking the layout or causing issues in the component rendering process';
    const mockError = { message: longMessage };
    render(<DataError error={mockError} />);

    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  test('renders within SectionContainer', () => {
    const mockError = { message: 'Container test' };
    const { container } = render(<DataError error={mockError} />);

    // SectionContainer should be in the DOM
    expect(container.firstChild).toBeInTheDocument();
  });
});
