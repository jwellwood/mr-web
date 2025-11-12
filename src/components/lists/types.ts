import type { ReactElement } from 'react';
import { TLinkType } from '../../constants';

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
