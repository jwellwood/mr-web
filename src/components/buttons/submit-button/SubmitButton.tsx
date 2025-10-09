import React from 'react';
import Button from '@mui/material/Button';
import { Spinner } from '../../loaders';
import { SxProps } from '@mui/material';
import { button_text } from '../../../i18n';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  isInModal?: boolean;
}

const SubmitButton: React.FC<Props> = ({ children, disabled, loading, onClick = () => {} }) => {
  return !loading ? (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={onClick}
      sx={
        {
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          height: '56px',
          borderRadius: '0px',
        } as SxProps
      }
    >
      {children || button_text.SUBMIT}
    </Button>
  ) : (
    <Spinner isSecondary />
  );
};

export default SubmitButton;
