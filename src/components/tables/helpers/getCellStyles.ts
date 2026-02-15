import type { ColumnConfig, CellStyle } from '../types';
import { getBackgroundColor } from './getBackgroundColor';
import { getBorderStyle } from './getBorderStyle';

export const getCellStyles = (
  cellKey: string,
  sortBy: string,
  column?: ColumnConfig
): CellStyle => {
  const align = column?.styles?.align || 'center';

  const sticky = column?.styles?.sticky ?? false;

  return {
    align,
    sticky,
    color: column?.styles?.color || 'data',
    backgroundColor: getBackgroundColor(cellKey, sortBy, column),
    border: getBorderStyle(column),
  };
};
