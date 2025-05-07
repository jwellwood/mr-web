import { SET_AUTH } from '../actions/auth.actions';
import { initialAuthState } from './state';

const initialState = { ...initialAuthState };

type AuthState = typeof initialState;

interface Action {
  type: string;
  payload: AuthState;
}

export const authReducer = (
  state: AuthState = { ...initialState },
  action: Action
): AuthState => {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH:
      return handleAuthAction(state, payload);
    default:
      return state;
  }
};

const handleAuthAction = (state: AuthState, payload: AuthState): AuthState => ({
  ...state,
  ...payload,
});
