import { Typography } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
  color?: string;
}

export default function AppTitleText({ children, color }: Props) {
  return (
    <Typography
      sx={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '0px 0px 50px #fff' }}
      color={color || 'label'}
    >
      {children}
    </Typography>
  );
}
