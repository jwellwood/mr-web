import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { IAlert } from '../types';
import { AppDispatch } from '../../../store/store';
import { getAlert } from '../../../store/features/alerts/alertSelector';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import { Slide, SlideProps } from '@mui/material';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export default function CustomAlert() {
  const alert: IAlert = useSelector(getAlert);
  const dispatch: AppDispatch = useDispatch();

  const handleClose = () => {
    dispatch(showAlert({ text: '', type: alert.type }));
  };

  return alert ? (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={!!alert.text}
      autoHideDuration={alert.type === 'error' ? null : 4000}
      onClose={handleClose}
      slots={{ transition: SlideTransition }}
    >
      <Alert onClose={handleClose} severity={alert.type}>
        {alert.text}
      </Alert>
    </Snackbar>
  ) : null;
}
