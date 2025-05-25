import React, { ReactElement } from 'react';
import Button from '@mui/material/Button';
import { getThemeColorByType } from '../../utils';
import { theme } from '../../theme';

interface Props {
  children?: string | ReactElement;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'outlined' | 'text' | 'contained';
  color?:
    | 'primary'
    | 'inherit'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'tertiary';
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
      fullWidth={fullWidth}
      sx={{
        padding: padding,
        color: getThemeColorByType(color),
        border: variant === 'outlined' ? `solid 1px ${getThemeColorByType(color)}` : 0,
        fontFamily: theme.typography.secondaryFont,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
