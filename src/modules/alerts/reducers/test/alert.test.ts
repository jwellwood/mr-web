import { alertsReducer } from '../../../../store/features/alerts/alertsSlice';
import { initAlertState } from '../initAlertState';

describe('App reducer tests', () => {
  test('alertReducer should return default state', () => {
    // @ts-expect-error testing init store with unknown action
    expect(alertsReducer(initAlertState, {})).toEqual(initAlertState);
  });
  test('alertReducer should use initialState if no state', () => {
    // @ts-expect-error testing init store with unknown action
    expect(alertsReducer(undefined, {})).toEqual(initAlertState);
  });
  test('alertReducer should update the state', () => {
    const expected = {
      text: 'Message',
      type: 'error',
    };
    expect(
      alertsReducer(initAlertState, {
        type: 'alerts/showAlert',
        payload: {
          text: 'Message',
          type: 'error',
        },
      })
    ).toEqual(expected);
  });
});
