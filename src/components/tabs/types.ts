import { ReactElement } from 'react';

export interface ITab {
  label: string | ReactElement;
  icon?: string | ReactElement;
  component: ReactElement;
  isHidden?: boolean;
}
