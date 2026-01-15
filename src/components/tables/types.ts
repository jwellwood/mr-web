import type { ReactElement } from 'react';

export interface IHeadCell {
  id: string;
  label: string | ReactElement;
  numeric?: boolean;
  width?: number;
  border?: boolean;
  padding?: string;
}

export interface ICellStyleByIndex {
  index: number;
  border?: '0px' | 'standard';
  background?: 'static';
  textColor?: string;
  textAlign?: 'left' | 'center' | 'right';
}
