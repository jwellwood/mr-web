import { describe, test, expect } from 'vitest';
import { getAverageAge } from '../getAverageAge';

describe('getAverageAge', () => {
  test('calculates average age from valid dates of birth', () => {
    const datesOfBirth = ['1990-01-01', '1985-06-15', '2000-12-31'];
    const selectedDate = '2020-01-01';
    const result = getAverageAge(datesOfBirth, selectedDate);

    // Ages would be: 30, 34, 19 -> average = 27.67
    expect(result).toBeCloseTo(27.67, 1);
  });

  test('uses current date when selectedDate is not provided', () => {
    const datesOfBirth = ['2000-01-01'];
    const result = getAverageAge(datesOfBirth);

    // Should calculate age based on current date
    expect(result).toBeGreaterThan(20);
    expect(result).toBeLessThan(100);
  });

  test('filters out invalid dates and calculates average of valid ones', () => {
    const datesOfBirth = ['1990-01-01', 'invalid-date', '2000-01-01', 'not-a-date'];
    const selectedDate = '2020-01-01';
    const result = getAverageAge(datesOfBirth, selectedDate);

    // Only valid dates: 1990-01-01 (30) and 2000-01-01 (20) -> average = 25
    expect(result).toBe(25);
  });

  test('returns 0 when all dates are invalid', () => {
    const datesOfBirth = ['invalid-date', 'not-a-date', ''];
    const result = getAverageAge(datesOfBirth);

    expect(result).toBe(0);
  });

  test('returns 0 when array is empty', () => {
    const datesOfBirth: string[] = [];
    const result = getAverageAge(datesOfBirth);

    expect(result).toBe(0);
  });

  test('handles a single valid date of birth', () => {
    const datesOfBirth = ['1995-05-15'];
    const selectedDate = '2020-05-15';
    const result = getAverageAge(datesOfBirth, selectedDate);

    expect(result).toBe(25);
  });

  test('calculates correctly for future selected date', () => {
    const datesOfBirth = ['2000-01-01'];
    const selectedDate = '2030-01-01';
    const result = getAverageAge(datesOfBirth, selectedDate);

    expect(result).toBe(30);
  });

  test('handles dates with different formats (ISO)', () => {
    const datesOfBirth = ['1990-06-15T00:00:00Z', '1985-03-20'];
    const selectedDate = '2020-01-01';
    const result = getAverageAge(datesOfBirth, selectedDate);

    // Ages would be approximately 29 and 34 -> average around 31.5
    expect(result).toBeGreaterThan(31);
    expect(result).toBeLessThan(32);
  });
});
