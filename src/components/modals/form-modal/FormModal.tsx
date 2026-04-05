import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '../../typography';

interface Props {
  title?: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function FormModal({ title, children, open, onClose }: Props) {
  const { t } = useTranslation('components');
  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
        {title ? (
          <DialogTitle id="responsive-dialog-title" color="primary">
            <CustomTypography color="secondary" bold>
              {title}
            </CustomTypography>
          </DialogTitle>
        ) : null}
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="tertiary">
            {t('BUTTONS.BACK')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
