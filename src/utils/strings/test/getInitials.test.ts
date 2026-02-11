import { describe, test, expect } from 'vitest';
import { getInitials } from '../getInitials';

describe('getInitials', () => {
  test('returns first letters of first two names', () => {
    expect(getInitials('John Smith')).toBe('JS');
  });

  test('returns single initial for single-name input', () => {
    expect(getInitials('Alice')).toBe('A');
  });

  test('returns empty string for empty input', () => {
    expect(getInitials('')).toBe('');
  });
});
