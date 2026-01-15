import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

import { CustomTypography } from '../typography';
import { SectionContainer } from '../containers';

interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string, reason?: string) => void;
  children: ReactNode;
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, children } = props;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
    >
      <DialogTitle>
        <CustomTypography bold color="secondary">
          Select Season
        </CustomTypography>
      </DialogTitle>
      <DialogContent>
        <SectionContainer>{children}</SectionContainer>
      </DialogContent>
    </Dialog>
  );
}
