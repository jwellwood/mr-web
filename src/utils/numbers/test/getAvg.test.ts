import { describe, expect, test } from 'vitest';
import { getAvg } from '../getAvg';

describe('get average tests', () => {
  test('should work for positive numbers', () => {
    expect(getAvg(3, 10)).toBe('0.30');
    expect(getAvg(30, 10)).toBe('3.00');
  });
  test('should work for zeros', () => {
    expect(getAvg(0, 0)).toBe('0.00');
    expect(getAvg(-1, 0)).toBe('0.00');
  });
  test('should work for decimal numbers', () => {
    expect(getAvg(5.5, 10)).toBe('0.55');
  });
  test('should work for negative numbers', () => {
    expect(getAvg(-1, 10)).toBe('-0.10');
  });
  test('should work for strings', () => {
    expect(getAvg('-1', '10')).toBe('-0.10');
  });
  test('should work for mixed strings and numbers', () => {
    expect(getAvg(-1, '10')).toBe('-0.10');
    expect(getAvg('-1', 10)).toBe('-0.10');
  });
});
