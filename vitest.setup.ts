// Import vitest-dom for DOM element assertions
// This makes jest-dom matchers available globally (toBeInTheDocument, etc.)
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import { invokeImpl } from './src/test/utils/mockUseMutation';

// Mock IntersectionObserver which is not available in jsdom
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

// Set up global mocks
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Add any other global mocks or setup needed for your tests

// Centralized mock for Apollo useMutation so tests can control behavior via helpers
vi.mock('@apollo/client/react', async () => {
  const actual =
    await vi.importActual<typeof import('@apollo/client/react')>('@apollo/client/react');
  return {
    ...actual,
    useMutation: (
      gql?: unknown,
      options?: { onError?: (err: { message?: string }) => void } | undefined
    ) => invokeImpl(gql, options),
  };
});
