import { describe, it, expect } from 'vitest';
import zodDate from '../zodDate';

describe('zodDate', () => {
  it('parses valid date string and Date object', () => {
    const schema = zodDate();
    expect(schema.parse(new Date('2020-01-01'))).toBeInstanceOf(Date);
    expect(schema.parse('2020-01-01')).toBeInstanceOf(Date);
    expect(schema.parse(1609459200000)).toBeInstanceOf(Date);
  });

  it('throws on invalid date when required', () => {
    const schema = zodDate();
    expect(() => schema.parse('not a date')).toThrow();
  });

  it('returns undefined for invalid date when optional', () => {
    const schema = zodDate(true);
    const parsed = schema.parse('not a date');
    expect(parsed).toBeUndefined();
  });

  it('accepts undefined when optional and value is undefined', () => {
    const schema = zodDate(true);
    const parsed = schema.parse(undefined);
    expect(parsed).toBeUndefined();
  });
});
