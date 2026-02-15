import type { ColumnConfig } from '../types';

export const getBorderStyle = (column?: ColumnConfig): string => {
  return column?.styles?.border ? '0.1px solid white' : '0px';
};
