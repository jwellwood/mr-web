import React from 'react';
import { DialogContent, DialogContentText } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AppIcon from '../icons/AppIcon';
import { Spinner } from '../loaders';
import { CustomTypography } from '../typography';

interface Props {
  title: string;
  loading?: boolean;
  onDelete: () => void;
  disabled?: boolean;
  text?: boolean;
}

const DeleteModal: React.FC<Props> = ({ title, loading = false, onDelete, disabled, text }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={handleClickOpen}>
        <IconButton color="secondary" aria-label="delete-modal-button">
          <AppIcon icon="delete" color="error" />
        </IconButton>
        {text ? (
          <CustomTypography size="xs" color="error">
            Delete {title}
          </CustomTypography>
        ) : null}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Permanently Delete {title}?</DialogTitle>
        <>
          <DialogContent>
            {!loading ? (
              <DialogContentText>
                This action cannot be undone! Are you sure you want to delete?
              </DialogContentText>
            ) : (
              <Spinner isSecondary />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" onClick={onDelete} disabled={disabled || loading}>
              Confirm
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  );
};

export default DeleteModal;
