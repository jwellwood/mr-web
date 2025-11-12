import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../store/store.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { getAlert } from '../../../store/features/alerts/alertSelector.ts';
import { IAlert } from '../types.ts';

export const useAlert = () => {
  const alert: IAlert = useSelector(getAlert);
  const dispatch: AppDispatch = useDispatch();

  const handleClose = () => {
    dispatch(showAlert({ text: '', type: alert.type }));
  };

  return { handleClose, alert };
};
