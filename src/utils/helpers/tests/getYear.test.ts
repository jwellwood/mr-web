import { getYear } from '../getYear';

describe('get year tests', () => {
  test('year is returned from date object', () => {
    const date = new Date(0);
    expect(getYear(date)).toBe(1970);
  });
});
