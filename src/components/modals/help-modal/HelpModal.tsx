import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../buttons';
import { APP_ICONS, AppIcon } from '../../icons';
import { CustomTypography } from '../../typography';

interface Props {
  children: ReactNode;
  title: string;
}

export default function HelpModal({ children, title }: Props) {
  const { t } = useTranslation('components');
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <CustomButton onClick={() => setOpen(true)} variant="text">
        <AppIcon icon={APP_ICONS.HELP} color="label" size="30px" />
      </CustomButton>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="help-dialog-title"
      >
        <DialogTitle id="help-dialog-title">
          <CustomTypography color="secondary" bold>
            {title} {t('BUTTONS.HELP')}
          </CustomTypography>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <CustomButton onClick={() => setOpen(false)} variant="text" color="tertiary">
            {t('BUTTONS.CLOSE')}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
