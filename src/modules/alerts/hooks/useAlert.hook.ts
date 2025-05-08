import { useDispatch, useSelector } from 'react-redux';
import { IAlert } from '../../../types';
import { AppDispatch } from '../../../store/store';
import {showAlert} from "../../../store/features/alerts/alertsSlice.ts";
import {getAlert} from "../../../store/features/alerts/alertSelector.ts";


export const useAlert = () => {
  const alert: IAlert = useSelector(getAlert);
  const dispatch: AppDispatch = useDispatch();

  const handleClose = () => {
    dispatch(showAlert({text: '', type: alert.type}));
  };

  return { handleClose, alert };
};
