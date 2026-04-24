import { describe, it, expect } from 'vitest';
import { isDateInPast } from '../isDateInPast';

describe('isDateInPast', () => {
  it('returns true for a date clearly in the past', () => {
    expect(isDateInPast('2020-01-01T00:00:00.000Z')).toBe(true);
  });

  it('returns false for a date clearly in the future', () => {
    expect(isDateInPast('2099-01-01T00:00:00.000Z')).toBe(false);
  });

  it('returns true for a datetime 1 second ago', () => {
    const past = new Date(Date.now() - 1000).toISOString();
    expect(isDateInPast(past)).toBe(true);
  });

  it('returns false for a datetime 60 seconds from now', () => {
    const future = new Date(Date.now() + 60_000).toISOString();
    expect(isDateInPast(future)).toBe(false);
  });

  it('handles date-only strings (no time component)', () => {
    expect(isDateInPast('2020-06-15')).toBe(true);
    expect(isDateInPast('2099-06-15')).toBe(false);
  });
});
