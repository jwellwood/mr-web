import { describe, it, expect } from 'vitest';
import { getShortDate } from '../getShortDate';

describe('getShortDate', () => {
  it('returns null for missing input', () => {
    expect(getShortDate()).toBeNull();
    expect(getShortDate(null)).toBeNull();
  });

  it('formats a date string and Date object to en-GB dd/mm/yy', () => {
    const iso = '2020-01-05T12:00:00Z';
    expect(getShortDate(iso)).toBe('05/01/20');
    expect(getShortDate(new Date(iso))).toBe('05/01/20');
  });
});
