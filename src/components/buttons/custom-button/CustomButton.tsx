import Button from '@mui/material/Button';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { TColor, TVariant } from '../types';

interface Props {
  children?: string | ReactNode;
  onClick?: () => void;
  variant?: TVariant;
  color?: TColor;
  link?: string;
}

export default function CustomButton({
  children,
  onClick,
  color = 'primary',
  variant = 'outlined',
  link,
}: Props) {
  const componentProps: Record<string, string | React.ElementType> = {
    component: link ? (Link as React.ElementType) : ('button' as React.ElementType),
  };
  if (link) componentProps.to = link;
  return (
    <Button variant={variant} onClick={onClick} color={color} {...componentProps}>
      {children}
    </Button>
  );
}
