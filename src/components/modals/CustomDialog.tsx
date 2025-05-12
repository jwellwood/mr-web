import React, { ReactNode } from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { CustomTypography } from '../typography';
import { theme } from '../../theme';

interface Props {
  fullScreen?: boolean;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const CustomDialog: React.FC<Props> = ({ fullScreen = true, isOpen, onClose, children, title }) => {
  return (
    <Dialog
      scroll="body"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          border: `3px solid ${theme.palette.primary.main}`,
        },
      }}
    >
      <DialogTitle>
        <CustomTypography bold size="lg" color="primary">
          {title}
        </CustomTypography>
      </DialogTitle>
      {children}
      <DialogActions>
        <Button autoFocus onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
