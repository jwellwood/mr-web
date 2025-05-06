import { getFewest } from '../getFewest';

describe('get lowest number tests', () => {
  test('should return the lowest value', () => {
    expect(getFewest([1, 2, 3, 12, 1])).toBe(1);
  });
  test('should work for negative numbers', () => {
    expect(getFewest([-1, -2, -3, -12, -1])).toBe(-12);
  });
  test('should work for strings', () => {
    expect(getFewest(['123', '22', '0'])).toBe(0);
  });
  test('return 0 for empty arrays', () => {
    expect(getFewest([])).toBe(0);
  });
});
