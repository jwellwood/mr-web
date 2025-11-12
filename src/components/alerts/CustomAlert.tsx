import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { useAlert } from './hooks/useAlert';

export default function CustomAlert() {
  const { handleClose, alert } = useAlert();

  return alert ? (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={!!alert.text}
      autoHideDuration={alert.type === 'error' ? null : 4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={alert.type}>
        {alert.text}
      </Alert>
    </Snackbar>
  ) : null;
}
