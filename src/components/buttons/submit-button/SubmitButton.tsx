import Button from '@mui/material/Button';
import React from 'react';
import { button_text } from '../../../i18n';
import CustomSkeleton from '../../loaders/custom-skeleton/CustomSkeleton';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

export default function SubmitButton({ children, disabled, loading, onClick = () => {} }: Props) {
  const loadingComp = () => {
    return <CustomSkeleton variant="rectangular" height={'24px'} />;
  };

  return loading ? (
    loadingComp()
  ) : (
    <Button
      fullWidth
      type="submit"
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={onClick}
    >
      {children || button_text.SUBMIT}
    </Button>
  );
}
