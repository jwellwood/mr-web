import * as actionIds from '../actions/actionIds';
import { TabAction } from '../types';
import { initTabState } from './initTabState';

const initialState = { ...initTabState };

export type TabIndexState = typeof initialState;

export const tabReducer = (
  state: TabIndexState = initTabState,
  action: TabAction
): TabIndexState => {
  const { payload, type } = action;
  switch (type) {
    case actionIds.SET_TAB_INDEX:
      return handleTabAction(state, payload);
    default:
      return state;
  }
};

const handleTabAction = (
  state: TabIndexState,
  payload: TabIndexState
): TabIndexState => ({
  ...state,
  ...payload,
});
