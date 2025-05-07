import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import * as Selectors from 'selectors';
import { IAlert } from 'types';

export const useAlert = () => {
  const alert: IAlert = useSelector(Selectors.getAlertMessage);
  const dispatch: AppDispatch = useDispatch();

  const handleClose = () => {
    dispatch(showAlert('', alert.type));
  };

  return { handleClose, alert };
};
