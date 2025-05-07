import * as actionIds from '../actionIds';
import { showAlert } from '../app.actions';

describe('App actions tests', () => {
  test('showAlert should be a valid action type', () => {
    const text = 'Message';
    const type = 'error';
    const expectation = {
      type: actionIds.SHOW_ALERT,
      payload: { text, type },
    };
    expect(showAlert(text, type)).toEqual(expectation);
  });
});
