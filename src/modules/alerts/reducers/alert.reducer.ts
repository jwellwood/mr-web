import * as actionIds from '../actions/actionIds';
import { AlertAction } from '../types';
import { initAlertState } from './initAlertState';

const initialState = { ...initAlertState };

export type AlertState = typeof initialState;

export const alertReducer = (
  state: AlertState = initAlertState,
  action: AlertAction
): AlertState => {
  const { payload, type } = action;
  switch (type) {
    case actionIds.SHOW_ALERT:
      return handleShowAlertAction(state, payload);
    default:
      return state;
  }
};

const handleShowAlertAction = (
  state: AlertState,
  payload: AlertState
): AlertState => ({
  ...state,
  ...payload,
});
