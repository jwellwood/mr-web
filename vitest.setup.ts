// Import vitest-dom for DOM element assertions
// This makes jest-dom matchers available globally (toBeInTheDocument, etc.)
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

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
