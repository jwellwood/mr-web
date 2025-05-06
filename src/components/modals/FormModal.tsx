import React, { ReactNode, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

type Props = {
  title: string;
  children: ReactNode;
  buttonElement: ReactNode;
  closeForm: () => boolean;
};

const FormModal: React.FC<Props> = ({
  title,
  children,
  buttonElement,
  closeForm,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (closeForm()) {
      setOpen(false);
    }
  }, [closeForm]);

  return (
    <div>
      <span role="button" style={{ cursor: 'pointer' }} onClick={handleOpen}>
        {buttonElement}
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {title ? (
          <DialogTitle id="responsive-dialog-title" color="primary">
            {title}
          </DialogTitle>
        ) : null}
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormModal;
