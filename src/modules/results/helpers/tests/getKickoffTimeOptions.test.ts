import { describe, it, expect } from 'vitest';
import { getKickoffTimeOptions } from '../getKickoffTimeOptions';

describe('getKickoffTimeOptions', () => {
  it('returns 96 quarter-hour options from 00:00 to 23:45', () => {
    const opts = getKickoffTimeOptions();
    expect(opts).toHaveLength(24 * 4);
    expect(opts[0]).toEqual({ label: '00:00', value: '00:00' });
    expect(opts[opts.length - 1]).toEqual({ label: '23:45', value: '23:45' });
  });
});
