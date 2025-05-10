import { IPlayerInMatch } from '../../../types';
export const SET_TEMP_PLAYERS = 'SET_TEMP_PLAYERS';
export const RESET_TEMP_PLAYERS = 'RESET_TEMP_PLAYERS';

export const setTempPlayers = (playersState: IPlayerInMatch[]) => {
  return {
    type: SET_TEMP_PLAYERS,
    payload: [...playersState],
  };
};

export const resetTempPlayers = () => {
  return {
    type: RESET_TEMP_PLAYERS,
  };
};
