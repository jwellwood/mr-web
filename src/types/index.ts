import type { ReactElement } from 'react';
import type {TLinkType} from "../constants.ts";

export * from './team.ts';
export * from './trophy';
export * from './user';
export * from './match';
export * from './matchStats.ts';
export * from './player';
export * from './playerInMatch';
export * from './image';
export * from './alert.ts';
export * from './organization.ts';

export interface IListItem {
  label: string | ReactElement;
  secondary?: string | ReactElement;
  type?: TLinkType;
  link?: string;
  value?: string | number | ReactElement;
  avatar?: string | ReactElement | null;
  icon?: ReactElement;
  border?: boolean;
  styles?: string | object;
  disabled?: boolean;
  hidden?: boolean;
  onClick?: () => void;
}

export interface ITabIndex {
  primary: number;
  secondary: number;
}
