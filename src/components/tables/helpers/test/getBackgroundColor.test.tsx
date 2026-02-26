import { describe, it, expect } from 'vitest';
import { theme } from '../../../../theme';
import { getOpaqueValue } from '../../../../utils/colors/getOpaqueValue';
import type { ColumnConfig } from '../../types';
import { getBackgroundColor } from '../getBackgroundColor';

describe('getBackgroundColor', () => {
  it('returns opaque primary when cell is selected and not position', () => {
    const res = getBackgroundColor('col1', 'col1', undefined);
    const expected = getOpaqueValue(theme.palette.primary.main);
    expect(res).toBe(expected);
  });

  it('returns dark.main when column.styles.background is true', () => {
    const column = { id: 'col1', styles: { background: true } } as ColumnConfig;
    const res = getBackgroundColor('col2', 'col1', column);
    expect(res).toBe(theme.palette.dark.main);
  });

  it('returns secondary.dark by default', () => {
    const res = getBackgroundColor('col2', 'col1', undefined);
    expect(res).toBe(theme.palette.secondary.dark);
  });
});
