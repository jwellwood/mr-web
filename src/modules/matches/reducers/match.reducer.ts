import { RESET_TEMP_MATCH, SET_TEMP_MATCH } from '../actions/matches.actions';
import { initialMatchState } from './state';

const initialState = { ...initialMatchState };

type TempMatchState = typeof initialState;

interface Action {
  type: string;
  payload: TempMatchState;
}

export const tempMatchReducer = (
  state: TempMatchState = { ...initialState },
  action: Action
): TempMatchState => {
  const { type, payload } = action;
  switch (type) {
    case SET_TEMP_MATCH:
      return handleAction(state, payload);
    case RESET_TEMP_MATCH:
      return handleAction(state, initialState);
    default:
      return state;
  }
};

const handleAction = (state: TempMatchState, payload: TempMatchState): TempMatchState => ({
  ...state,
  ...payload,
});
