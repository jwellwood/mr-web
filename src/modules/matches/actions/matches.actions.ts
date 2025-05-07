import { ITempMatch } from 'types';

export const SET_TEMP_MATCH = 'SET_TEMP_MATCH';
export const RESET_TEMP_MATCH = 'RESET_TEMP_MATCH';

export const setTempMatch = (matchState: Partial<ITempMatch>) => {
  return {
    type: SET_TEMP_MATCH,
    payload: { ...matchState },
  };
};

export const resetTempMatch = () => {
  return {
    type: RESET_TEMP_MATCH,
  };
};
