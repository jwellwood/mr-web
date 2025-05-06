import { getPercentage } from '../getPercentage';

describe('get percentage tests', () => {
  test('should return a percentage', () => {
    expect(getPercentage(50, 100, 0)).toBe(50);
  });
  test('should add the correct number of decimal places', () => {
    expect(getPercentage(4, 5, 2)).toBe(80.0);
  });
  test('should work for values over 100', () => {
    expect(getPercentage(10, 8, 1)).toBe(125.0);
  });
  test('should return 0 if NaN', () => {
    expect(getPercentage('string', 8, 1)).toBe(0);
  });
  test('should round to nearest int if fix not specified', () => {
    expect(getPercentage(5, 7.5)).toBe(67);
  });
});
