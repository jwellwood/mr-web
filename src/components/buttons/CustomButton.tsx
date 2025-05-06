import React, { ReactElement } from 'react';
import Button from '@mui/material/Button';

interface Props {
  children?: string | ReactElement;
  onClick?: () => void;
  type?: any;
  disabled?: boolean;
  variant?: any;
  color?: any;
  fullWidth?: boolean;
  padding?: string;
}

const CustomButton: React.FC<Props> = ({
  children,
  onClick,
  type,
  disabled,
  color = 'primary',
  variant = 'outlined',
  fullWidth = false,
  padding,
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      type={type}
      disabled={disabled}
      color={color}
      fullWidth={fullWidth}
      sx={{
        padding: padding,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
