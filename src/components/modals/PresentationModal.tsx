import React, { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CustomButton } from '../buttons';
import { CustomTypography } from '../typography';

interface Props {
  children: ReactNode;
  title?: string | ReactNode;
  buttonElement: React.ReactElement;
  fullScreen?: boolean;
}

const PresentationModal: React.FC<Props> = ({
  children,
  title,
  buttonElement,
  fullScreen = false,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span
        role="button"
        style={{ cursor: 'pointer' }}
        onClick={handleClickOpen}
      >
        {buttonElement}
      </span>
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            // background: 'rgba(0,0,0,0.9)',
          },
        }}
      >
        {title ? (
          <DialogTitle id="responsive-dialog-title">
            <CustomTypography color="secondary" bold>
              {title}
            </CustomTypography>
          </DialogTitle>
        ) : null}
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <CustomButton onClick={handleClose} variant="text" color="secondary">
            Back
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PresentationModal;
