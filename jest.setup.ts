// Import jest-dom for DOM element assertions
import '@testing-library/jest-dom';

// Mock IntersectionObserver which is not available in jsdom
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

// Set up global mocks
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
});

// Add any other global mocks or setup needed for your tests