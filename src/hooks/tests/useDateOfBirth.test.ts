import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDateOfBirth } from '../useDateOfBirth';

// Pin the current date for deterministic age calculations
const TODAY = '2026-04-08';

describe('useDateOfBirth', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(TODAY));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns dashes when no argument is provided', () => {
    expect(useDateOfBirth()).toEqual({ formattedDateOfBirth: '-', age: '-' });
  });

  it('returns dashes when dateOfBirth is undefined', () => {
    expect(useDateOfBirth(undefined)).toEqual({ formattedDateOfBirth: '-', age: '-' });
  });

  it('calculates correct age from an ISO date string', () => {
    const { age, formattedDateOfBirth } = useDateOfBirth('2000-04-08');
    expect(age).toBe(26);
    expect(typeof formattedDateOfBirth).toBe('string');
    expect(formattedDateOfBirth).not.toBe('-');
  });

  it('returns one year less when the birthday has not yet occurred this year', () => {
    const { age } = useDateOfBirth('2000-04-09'); // birthday is tomorrow
    expect(age).toBe(25);
  });

  it('counts the full year when the birthday already passed this year', () => {
    const { age } = useDateOfBirth('2000-04-07'); // birthday was yesterday
    expect(age).toBe(26);
  });

  it('calculates age from a numeric timestamp string', () => {
    const timestamp = String(new Date('2000-04-08').getTime());
    const { age } = useDateOfBirth(timestamp);
    expect(age).toBe(26);
  });
});
