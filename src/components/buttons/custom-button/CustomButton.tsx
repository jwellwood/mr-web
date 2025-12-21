import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';

import { TColor, TVariant } from '../types';
import ButtonLoader from '../../loaders/ButtonLoader';

interface Props {
  children?: string | ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: TVariant;
  color?: TColor;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton: React.FC<Props> = ({
  children,
  onClick,
  type,
  disabled,
  color = 'primary',
  variant = 'outlined',
  fullWidth = false,
  loading,
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      color={color}
      loading={loading}
      loadingIndicator={loading ? <ButtonLoader /> : undefined}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
