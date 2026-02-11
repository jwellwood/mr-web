import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from '../error-boundary/ErrorBoundary';

// Wrapper component for router context
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console errors in tests
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  test('renders children when no error occurs', () => {
    render(
      <RouterWrapper>
        <ErrorBoundary>
          <div>Child component</div>
        </ErrorBoundary>
      </RouterWrapper>
    );

    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  test('renders error UI when child component throws error', () => {
    render(
      <RouterWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </RouterWrapper>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('displays error message in UI', () => {
    render(
      <RouterWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </RouterWrapper>
    );

    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });

  test('displays helpful user message', () => {
    render(
      <RouterWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </RouterWrapper>
    );

    expect(screen.getByText('There was a problem')).toBeInTheDocument();
    expect(screen.getByText('Try refreshing the page, or go to the home page')).toBeInTheDocument();
  });

  test('renders refresh button', () => {
    render(
      <RouterWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </RouterWrapper>
    );

    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument();
  });

  test('renders home link button', () => {
    render(
      <RouterWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </RouterWrapper>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('refresh button reloads the page', async () => {
    const user = userEvent.setup();
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: {
        reload: reloadMock,
      },
      writable: true,
    });

    render(
      <RouterWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </RouterWrapper>
    );

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    await user.click(refreshButton);

    expect(reloadMock).toHaveBeenCalled();
  });

  test('renders multiple children correctly when no error', () => {
    render(
      <RouterWrapper>
        <ErrorBoundary>
          <div>First child</div>
          <div>Second child</div>
          <div>Third child</div>
        </ErrorBoundary>
      </RouterWrapper>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  test('catches errors from nested components', () => {
    render(
      <RouterWrapper>
        <ErrorBoundary>
          <div>
            <div>
              <ThrowError shouldThrow={true} />
            </div>
          </div>
        </ErrorBoundary>
      </RouterWrapper>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('displays error in development mode', () => {
    const consoleLogSpy = vi.spyOn(console, 'log');

    render(
      <RouterWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </RouterWrapper>
    );

    // Error should be logged in development
    // Note: This depends on import.meta.env.DEV being true
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    consoleLogSpy.mockRestore();
  });

  test('error boundary does not interfere with normal rendering', () => {
    const { rerender } = render(
      <RouterWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      </RouterWrapper>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();

    // Rerender without error
    rerender(
      <RouterWrapper>
        <ErrorBoundary>
          <div>Updated content</div>
        </ErrorBoundary>
      </RouterWrapper>
    );

    expect(screen.getByText('Updated content')).toBeInTheDocument();
  });
});
