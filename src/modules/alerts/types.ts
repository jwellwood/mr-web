import { AlertState } from './reducers/alert.reducer';
import { TabIndexState } from './reducers/tab.reducer';

export interface AlertAction {
  type: string;
  payload: AlertState;
}

export interface TabAction {
  type: string;
  payload: TabIndexState;
}
