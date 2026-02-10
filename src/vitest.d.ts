/* eslint-disable @typescript-eslint/no-empty-object-type */
/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom/vitest" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<
    typeof expect.stringContaining,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  > {}
}

export {};
