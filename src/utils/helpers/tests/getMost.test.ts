import { getMost } from '../getMost';

describe('get most tests', () => {
  test('should return the highest value', () => {
    expect(getMost([1, 2, 3, 0, 1])).toBe(3);
  });
  test('should work for negative numbers', () => {
    expect(getMost([-1, -2, -3, -12, -1])).toBe(-1);
  });
  test('should work for strings', () => {
    expect(getMost(['123', '22', '0'])).toBe(123);
  });
  test('return 0 for empty arrays', () => {
    expect(getMost([])).toBe(0);
  });
});
