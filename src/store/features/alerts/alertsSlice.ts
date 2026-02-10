import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IAlert } from '../../../components/alerts/types';

const initialState: IAlert = {
  text: '',
  type: null,
};

const alertsSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<IAlert>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearAlert: () => {
      return initialState;
    },
  },
});

// Export the action creators
export const { showAlert, clearAlert } = alertsSlice.actions;

// Export the reducer
export const { reducer: alertsReducer } = alertsSlice;
