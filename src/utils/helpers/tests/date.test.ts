import { parseDate } from '../parseDate';
describe('Date formatter tests', () => {
  process.env.TZ = 'UTC'
  test('returns a formatted date', () => {
    expect(parseDate('2020-07-14T21:51:41.056Z')).toBe('Jul 14 2020');
    // expect(parseDate('2020-01-01T00:00:00.000Z')).toBe('Jan 01 2020');
  });
  test('should work with a new date', () => {
    const date = new Date();
    expect(parseDate(date)).toBeDefined();
    expect(parseDate(date)).toHaveLength(11);
  });
});
