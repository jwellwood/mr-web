import React from 'react';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';

import { button_text } from '../../../i18n';
import ButtonLoader from '../../loaders/ButtonLoader';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  nonFixed?: boolean;
}

export default function SubmitButton({
  children,
  disabled,
  loading,
  onClick = () => {},
  nonFixed,
}: Props) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={onClick}
      loading={loading}
      loadingIndicator={loading ? <ButtonLoader /> : undefined}
      sx={
        nonFixed
          ? {}
          : ({
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              height: '56px',
              borderRadius: '0px',
            } as SxProps)
      }
    >
      {children || button_text.SUBMIT}
    </Button>
  );
}
