import type { ReactNode } from 'react';

export type CellType =
  | 'default'
  | 'link'
  | 'position'
  | 'difference'
  | 'percentage'
  | 'nationality'
  | 'image';

export interface ColumnStyles {
  color?: string;
  width?: number;
  background?: boolean;
  border?: boolean;
  align?: 'left' | 'center' | 'right';
  sticky?: boolean;
}

export interface ColumnConfig<T = Record<string, unknown>> {
  id: keyof T;
  label?: ReactNode;
  type?: CellType;
  isStatic?: boolean;
  styles?: ColumnStyles;
}

export interface CellValueObject {
  value: ReactNode;
  link?: string; // For link cells
  type?: string; // For image cells to specify fallback icon type
}

export type CellValue = string | number | ReactNode | CellValueObject;

export interface CellStyle {
  align: 'left' | 'center' | 'right';
  sticky: boolean;
  color: string;
  backgroundColor: string;
  border: string;
}
