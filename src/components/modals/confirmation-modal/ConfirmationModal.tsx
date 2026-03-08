import { Box, DialogContent, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React, { ReactElement } from 'react';
import { TApolloError } from '../../../types/apollo';
import { SectionContainer } from '../../containers';
import { MutationError } from '../../errors';
import { AppIcon } from '../../icons';
import { Spinner } from '../../loaders';
import { CustomTypography } from '../../typography';

interface Props {
  title: string;
  loading: boolean;
  onConfirm: () => void;
  disabled?: boolean;
  error?: TApolloError;
  children?: React.ReactNode;
  btn: ReactElement;
}

export default function ConfirmationModal({
  title,
  loading,
  onConfirm,
  disabled,
  error,
  children,
  btn,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={handleClickOpen}>{btn}</div>
      <Dialog open={open} onClose={handleClose} sx={{ background: 'rgba(0,0,0,0.7)' }}>
        <SectionContainer>
          <DialogTitle id="form-dialog-title">
            <Stack spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <AppIcon icon="pending" size={'40px'} color="primary" />
              <CustomTypography size="sm" bold color="data">
                {title}
              </CustomTypography>
            </Stack>
          </DialogTitle>

          <DialogContent>
            <SectionContainer>
              {!loading ? (
                <CustomTypography color="label">{children}</CustomTypography>
              ) : (
                <Box sx={{ width: 280, height: 56 }}>
                  <Spinner />
                </Box>
              )}
            </SectionContainer>
            {error && <MutationError error={error} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="tertiary">
              Back
            </Button>
            <Button
              type="submit"
              color="primary"
              onClick={onConfirm}
              disabled={disabled || loading}
            >
              CONFIRM
            </Button>
          </DialogActions>
        </SectionContainer>
      </Dialog>
    </>
  );
}
