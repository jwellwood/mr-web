import {
  RESET_TEMP_PLAYERS,
  SET_TEMP_PLAYERS,
} from '../actions/players.actions';

const initialState = [];

type TempPlayerState = typeof initialState;

interface Action {
  type: string;
  payload: TempPlayerState;
}

export const tempPlayersReducer = (
  state: TempPlayerState = [],
  action: Action
): TempPlayerState => {
  const { type, payload } = action;
  switch (type) {
    case SET_TEMP_PLAYERS:
      return payload;
    case RESET_TEMP_PLAYERS:
      return [];
    default:
      return state;
  }
};
