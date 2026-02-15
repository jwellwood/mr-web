import { theme } from '../../../theme';
import { getOpaqueValue } from '../../../utils/colors/getOpaqueValue';
import type { ColumnConfig } from '../types';

export const getBackgroundColor = (
  cellKey: string,
  sortBy: string,
  column?: ColumnConfig
): string => {
  const { dark, secondary } = theme.palette;

  const isSelected = cellKey === sortBy && cellKey !== 'position';

  const defaultBackground = secondary.dark;

  if (isSelected) {
    return getOpaqueValue(theme.palette.primary.main);
  }

  return column?.styles?.background ? dark.main : defaultBackground;
};
