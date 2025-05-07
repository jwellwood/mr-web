import { AlertAction } from 'modules/alerts/types';
import * as actionIds from '../../actions/actionIds';
import { alertReducer, AlertState } from '../alert.reducer';
import { initAlertState } from '../initAlertState';

describe('App reducer tests', () => {
  test('alertReducer should return default state', () => {
    expect(alertReducer(initAlertState, {} as AlertAction)).toEqual(
      initAlertState
    );
  });
  test('alertReducer should use initialState if no state', () => {
    expect(alertReducer(undefined as AlertState, {} as AlertAction)).toEqual(
      initAlertState
    );
  });
  test('alertReducer should update the state', () => {
    const expected = {
      text: 'Message',
      type: 'error',
    };
    expect(
      alertReducer(initAlertState, {
        type: actionIds.SHOW_ALERT,
        payload: {
          text: 'Message',
          type: 'error',
        },
      })
    ).toEqual(expected);
  });
});
