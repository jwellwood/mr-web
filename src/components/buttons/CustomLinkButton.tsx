import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ErrorBoundary from '../../errors/ErrorBoundary.tsx';

interface Props {
  children: ReactNode | string;
  link: string;
  type?: 'outlined' | 'text' | 'contained';
  color?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  disabled?: boolean;
  fullWidth?: boolean;
}

const CustomLinkButton: React.FC<Props> = ({
  children,
  link,
  type = 'outlined',
  color = 'primary',
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <ErrorBoundary>
      <Button
        fullWidth={fullWidth}
        variant={type}
        component={Link}
        to={link}
        color={color}
        disabled={disabled}
      >
        {children}
      </Button>
    </ErrorBoundary>
  );
};

export default CustomLinkButton;
