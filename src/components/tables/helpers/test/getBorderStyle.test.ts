import { describe, it, expect } from 'vitest';
import type { ColumnConfig } from '../../types';
import { getBorderStyle } from '../getBorderStyle';

describe('getBorderStyle', () => {
  it('returns solid when border true', () => {
    const col = { id: 'a', styles: { border: true } } as ColumnConfig;
    expect(getBorderStyle(col)).toBe('0.1px solid white');
  });

  it('returns 0px otherwise', () => {
    expect(getBorderStyle(undefined)).toBe('0px');
  });
});
