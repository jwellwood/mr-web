import Button from '@mui/material/Button';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode | string;
  link: string;
  type?: 'outlined' | 'text' | 'contained';
  color?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

export default function LinkButton({
  children,
  link,
  type = 'outlined',
  color = 'primary',
}: Props) {
  return (
    <Button variant={type} component={Link} to={link} color={color}>
      {children}
    </Button>
  );
}
