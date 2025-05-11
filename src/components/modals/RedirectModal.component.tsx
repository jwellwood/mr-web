import React, { ReactNode } from 'react';
import { DialogContentText, Link } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {theme} from "../../theme";

interface Props {
  buttonComponent: ReactNode;
  link: string;
  disabled?: boolean;
}

const RedirectModal: React.FC<Props> = ({
  buttonComponent,
  link,
  disabled,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={handleClickOpen}>{buttonComponent}</div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        PaperProps={{
          style: {
            background: 'rgba(0,0,0,0.9)',
            border: `3px solid ${theme.palette.primary.main}`,
          },
        }}
      >
        <DialogTitle id='form-dialog-title'>Redirect</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`You will be redirected to ${link}. Do you want to continue?`}
          </DialogContentText>

          <DialogActions>
            <Button onClick={handleClose} color='secondary'>
              Cancel
            </Button>
            <Link target='_blank' href={link} rel='noopener'>
              <Button color='primary' disabled={disabled}>
                Yes
              </Button>
            </Link>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RedirectModal;
