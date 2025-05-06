import { shortenYear } from '../shortenYear';

describe('shortenYear test', () => {
  test('should early return when not a year', () => {
    expect(shortenYear(101)).toBe(101);
    expect(shortenYear(null)).toBe(null);
    expect(shortenYear('')).toBe('');
    expect(shortenYear('10')).toBe('10');
  });
  test('should return final two digits when number', () => {
    expect(shortenYear(2000)).toBe('00');
    expect(shortenYear(2001)).toBe('01');
    expect(shortenYear(2010)).toBe('10');
    expect(shortenYear(2011)).toBe('11');
  });
  test('should return final two digits when string', () => {
    expect(shortenYear('2000')).toBe('00');
    expect(shortenYear('2001')).toBe('01');
    expect(shortenYear('2010')).toBe('10');
    expect(shortenYear('2011')).toBe('11');
  });
});
