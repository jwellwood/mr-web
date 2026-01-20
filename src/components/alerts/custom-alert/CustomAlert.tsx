import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Slide, SlideProps } from '@mui/material';

import { AppDispatch, getAlert, showAlert } from '../../../store';
import type { IAlert } from '../types';

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
