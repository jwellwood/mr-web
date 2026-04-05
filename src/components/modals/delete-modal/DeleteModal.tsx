import { Box, DialogContent, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TApolloError } from '../../../types/apollo';
import { CustomAccordion } from '../../accordion';
import { SectionContainer } from '../../containers';
import { MutationError } from '../../errors';
import { AppIcon } from '../../icons';
import { Spinner } from '../../loaders';
import { CustomTypography } from '../../typography';

interface Props {
  title: string;
  loading: boolean;
  onDelete: () => void;
  disabled?: boolean;
  error?: TApolloError;
}

export default function DeleteModal({ title, loading, onDelete, disabled, error }: Props) {
  const { t } = useTranslation('components');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomAccordion title={<AppIcon icon="delete" color="error" />} isExpanded={false}>
        <div onClick={handleClickOpen} data-testid="delete-modal-trigger">
          <CustomTypography size="xs" color="error">
            {t('FORMS.DELETE.TITLE', { item: title })}
          </CustomTypography>
        </div>
      </CustomAccordion>
      <Dialog open={open} onClose={handleClose} sx={{ background: 'rgba(0,0,0,0.7)' }}>
        <SectionContainer type="delete">
          <DialogTitle id="form-dialog-title">
            <Stack spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <AppIcon icon="delete" size={'40px'} color="error" />
              <CustomTypography size="sm" bold color="data">
                {t('FORMS.DELETE.TITLE', { item: title })}
              </CustomTypography>
            </Stack>
          </DialogTitle>

          <DialogContent>
            <SectionContainer type="delete">
              {!loading ? (
                <CustomTypography color="label">{t('FORMS.DELETE.MESSAGE')}</CustomTypography>
              ) : (
                <Box sx={{ width: 280, height: 56 }}>
                  <Spinner />
                </Box>
              )}
            </SectionContainer>
            {error && <MutationError error={error} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="warning">
              {t('BUTTONS.CANCEL')}
            </Button>
            <Button type="submit" color="error" onClick={onDelete} disabled={disabled || loading}>
              {t('BUTTONS.DELETE')}
            </Button>
          </DialogActions>
        </SectionContainer>
      </Dialog>
    </>
  );
}
