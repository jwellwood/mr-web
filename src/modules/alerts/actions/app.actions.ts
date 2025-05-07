import * as actionIds from './actionIds';

type ShowAlert = (text: string, type: string) => void;
type SetTabIndex = (tab: string, index: number) => void;

export const showAlert: ShowAlert = (text, type) => {
  return {
    type: actionIds.SHOW_ALERT,
    payload: { text, type },
  };
};

export const setTabIndex: SetTabIndex = (tab, index) => {
  return {
    type: actionIds.SET_TAB_INDEX,
    payload: { [tab]: index },
  };
};
