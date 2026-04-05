import Button from '@mui/material/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../theme';
import CustomSkeleton from '../../loaders/custom-skeleton/CustomSkeleton';
import ConfirmationModal from '../../modals/confirmation-modal/ConfirmationModal';

interface ConfirmProps {
  show?: boolean;
  title?: string;
  content?: React.ReactNode;
}

interface Props {
  type?: 'button' | 'submit';
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (ev?: React.FormEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  confirm?: ConfirmProps;
}
export default function SubmitButton({
  children,
  disabled,
  loading,
  onClick = () => {},
  confirm,
  type = 'submit',
}: Props) {
  const { t } = useTranslation('components');
  const loadingComp = () => {
    return <CustomSkeleton variant="rectangular" height={'24px'} />;
  };

  if (loading) return loadingComp();

  const confirmEnabled = !!(confirm && confirm.show);

  const btn = (
    <Button
      fullWidth
      type={confirmEnabled ? 'button' : type}
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={confirmEnabled ? () => {} : onClick}
      sx={{
        '&.Mui-disabled': {
          backgroundColor: theme.palette.secondary.light, // your custom color
          color: theme.palette.text.disabled, // your custom text color
          opacity: 1, // override default opacity if needed
        },
      }}
    >
      {children || t('BUTTONS.SUBMIT')}
    </Button>
  );

  if (confirmEnabled) {
    const confirmProps = typeof confirm === 'object' ? confirm : {};
    return (
      <ConfirmationModal
        title={confirmProps.title ?? ''}
        loading={!!loading}
        onConfirm={() => {
          onClick();
        }}
        disabled={disabled}
        btn={btn}
      >
        {confirmProps.content}
      </ConfirmationModal>
    );
  }

  return btn;
}
