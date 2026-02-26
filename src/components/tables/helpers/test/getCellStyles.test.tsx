import { describe, it, expect } from 'vitest';
import type { ColumnConfig } from '../../types';
import { getBackgroundColor } from '../getBackgroundColor';
import { getBorderStyle } from '../getBorderStyle';
import { getCellStyles } from '../getCellStyles';

describe('getCellStyles', () => {
  it('composes styles from column and helpers', () => {
    const col = {
      id: 'a',
      styles: { align: 'left', sticky: true, color: 'red', background: true },
    } as ColumnConfig;

    const out = getCellStyles('a', 'b', col);

    expect(out.align).toBe('left');
    expect(out.sticky).toBe(true);
    expect(out.color).toBe('red');
    expect(out.backgroundColor).toBe(getBackgroundColor('a', 'b', col));
    expect(out.border).toBe(getBorderStyle(col));
  });
});
