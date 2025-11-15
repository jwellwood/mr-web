import React from 'react';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';

import { Spinner } from '../../loaders';
import { button_text } from '../../../i18n';

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
      {loading ? <Spinner isSecondary /> : children || button_text.SUBMIT}
    </Button>
  );
}
