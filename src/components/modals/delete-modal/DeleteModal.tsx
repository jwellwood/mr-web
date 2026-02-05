import React from 'react';
import { ApolloError } from '@apollo/client';
import { Box, DialogContent, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

import AppIcon from '../../icons/AppIcon';
import { Spinner } from '../../loaders';
import { CustomTypography } from '../../typography';
import { MutationError } from '../../errors';
import { SectionContainer } from '../../containers';

interface Props {
  title: string;
  loading: boolean;
  onDelete: () => void;
  disabled?: boolean;
  error?: ApolloError;
}

export default function DeleteModal({ title, loading, onDelete, disabled, error }: Props) {
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
        <CustomTypography size="xs" color="error">
          Delete {title}
        </CustomTypography>
      </div>
      <Dialog open={open} onClose={handleClose} sx={{ background: 'rgba(0,0,0,0.7)' }}>
        <SectionContainer type="delete">
          <DialogTitle id="form-dialog-title">
            <Stack spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <AppIcon icon="delete" size={'40px'} color="error" />
              <CustomTypography size="sm" bold color="data">
                Delete {title}?
              </CustomTypography>
            </Stack>
          </DialogTitle>

          <DialogContent>
            <SectionContainer type="delete">
              {!loading ? (
                <CustomTypography color="label">
                  This action cannot be undone! Are you sure you want to delete?
                </CustomTypography>
              ) : (
                <Box sx={{ width: 280, height: 56 }}>
                  <Spinner isSecondary />
                </Box>
              )}
            </SectionContainer>
            {error && <MutationError error={error} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="warning">
              Back
            </Button>
            <Button type="submit" color="error" onClick={onDelete} disabled={disabled || loading}>
              DELETE
            </Button>
          </DialogActions>
        </SectionContainer>
      </Dialog>
    </>
  );
}
