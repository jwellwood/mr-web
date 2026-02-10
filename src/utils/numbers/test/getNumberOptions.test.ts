import { describe, it, expect } from 'vitest';
import { getNumberOptions } from '../getNumberOptions';

describe('getNumberOptions', () => {
  it('returns default range 0-99 step 1', () => {
    const opts = getNumberOptions();
    expect(opts.length).toBe(100);
    expect(opts[0]).toEqual({ label: '0', value: 0 });
    expect(opts[99]).toEqual({ label: '99', value: 99 });
  });

  it('accepts a custom step', () => {
    const opts = getNumberOptions(5, 2, 2);
    expect(opts).toEqual([
      { label: '2', value: 2 },
      { label: '4', value: 4 },
    ]);
  });

  it('handles negative ranges and non-integer steps', () => {
    const opts = getNumberOptions(-1, -3, 1);
    expect(opts).toEqual([
      { label: '-3', value: -3 },
      { label: '-2', value: -2 },
      { label: '-1', value: -1 },
    ]);
  });
});
