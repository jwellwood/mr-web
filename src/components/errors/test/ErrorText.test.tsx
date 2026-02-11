import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import ErrorText from '../error-text/ErrorText';

describe('ErrorText', () => {
  test('renders children correctly', () => {
    render(<ErrorText>Error message</ErrorText>);

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('renders as warning alert', () => {
    const { container } = render(<ErrorText>Warning</ErrorText>);

    const alert = container.querySelector('[class*="MuiAlert"]');
    expect(alert).toBeInTheDocument();
  });

  test('renders different text content', () => {
    const messages = [
      'Something went wrong',
      'Error occurred',
      'Please try again',
      'Network error',
    ];

    messages.forEach(message => {
      const { rerender } = render(<ErrorText>{message}</ErrorText>);
      expect(screen.getByText(message)).toBeInTheDocument();
      rerender(<ErrorText>new message</ErrorText>);
    });
  });

  test('renders with typography styling', () => {
    render(<ErrorText>Styled text</ErrorText>);

    const text = screen.getByText('Styled text');
    expect(text).toHaveStyle({ textDecoration: 'none' });
  });

  test('renders complex children', () => {
    render(
      <ErrorText>
        <span>Complex error: </span>
        <strong>Failed to load</strong>
      </ErrorText>
    );

    expect(screen.getByText('Complex error:')).toBeInTheDocument();
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });

  test('renders empty children', () => {
    const { container } = render(<ErrorText>{''}</ErrorText>);

    expect(container.querySelector('[class*="MuiAlert"]')).toBeInTheDocument();
  });

  test('renders long text content', () => {
    const longText =
      'This is a very long error message that should be displayed correctly without any issues in the alert component';
    render(<ErrorText>{longText}</ErrorText>);

    expect(screen.getByText(longText)).toBeInTheDocument();
  });
});
