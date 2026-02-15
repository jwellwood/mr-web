import { Typography, TypographyProps, SxProps, Theme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../../../theme';
import { getColor, getSize } from '../../typography/tokens';
import { ColorToken, SizeToken } from './types';

interface Props {
  children: React.ReactNode;
  color?: ColorToken;
  size?: SizeToken;
  bold?: boolean;
  link?: string;
}

export default function CustomTypography({
  children,
  color = 'label',
  size = 'sm',
  bold = false,
  link,
}: Props) {
  const {
    typography: { fontFamily },
  } = theme;

  const componentProps: Record<string, string | React.ElementType> = {
    component: link ? (Link as React.ElementType) : ('span' as React.ElementType),
  };
  if (link) componentProps.to = link;

  const sx: SxProps<Theme> = {
    color: color ? getColor(String(color)) : 'inherit',
    fontSize: getSize(String(size)),
    fontFamily,
    fontWeight: bold ? 'bold' : 'normal',
    textDecoration: 'none',
  };

  return (
    <Typography sx={sx} {...(componentProps as TypographyProps)}>
      {children}
    </Typography>
  );
}
