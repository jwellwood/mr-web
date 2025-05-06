import { getSum } from '../getSum';

describe('get sum tests', () => {
  test('positive numbers', () => {
    expect(getSum(1, 2)).toBe(3);
  });

  test('negative numbers', () => {
    expect(getSum(-1, -2)).toBe(-3);
  });

  test('zeros', () => {
    expect(getSum(0, 0)).toBe(0);
  });
});
