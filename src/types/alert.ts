export type IAlertType = 'success' | 'error' | 'warning' | 'info';

export interface IAlert {
  text: string;
  type: IAlertType;
}
