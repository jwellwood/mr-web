import { ReactElement } from 'react';

export interface ITab {
  label: string | ReactElement;
  hidden?: boolean;
  icon?: string | ReactElement;
  component: ReactElement;
}
