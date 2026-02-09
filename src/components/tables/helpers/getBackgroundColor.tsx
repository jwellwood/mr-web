import { ReactNode } from 'react';
import { BACKGROUND_STYLE } from '../../../constants';
import { theme } from '../../../theme';
import { getOpaqueValue } from '../../../utils/colors/getOpaqueValue';
import type { ICellStyleByIndex } from '../types';

export const getBackgroundColor = (
  item: [string, ReactNode | number | object],
  i: number,
  sortBy?: string,
  cellIndexStyles?: readonly ICellStyleByIndex[]
) => {
  const staticBackground = theme.palette.secondary.dark;
  let backgroundColor = theme.palette.dark.main;
  const isSelected = item[0] === sortBy;
  const cellIndex = cellIndexStyles?.map(cell => cell.index) ?? [];

  if (cellIndex.includes(i)) {
    backgroundColor =
      cellIndexStyles?.find(cell => cell.index === i)?.background || theme.palette.dark.main;
  }
  if (isSelected && item[0] !== 'position') {
    backgroundColor = getOpaqueValue(theme.palette.primary.main);
  }
  return backgroundColor === BACKGROUND_STYLE.STATIC ? staticBackground : backgroundColor;
};
