import { describe, it, expect } from 'vitest';
import { getOpaqueValue } from '../getOpaqueValue';

describe('getOpaqueValue', () => {
  it('converts hex to hex with appended alpha (default and custom)', () => {
    expect(getOpaqueValue('#112233')).toBe('#11223320');
    expect(getOpaqueValue('#112233', 0.5)).toBe('#11223350');
  });

  it('converts rgb(...) to rgba(...) string (default and custom)', () => {
    expect(getOpaqueValue('rgb(17,34,51)')).toBe('rgb(17,34,51,0.2)');
    expect(getOpaqueValue('rgb(17,34,51)', 0.5)).toBe('rgb(17,34,51,0.5)');
  });
});
