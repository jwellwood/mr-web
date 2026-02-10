import { Grid } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
  size?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export default function CustomGridItem({ children, size = 6, textAlign = 'center' }: Props) {
  return (
    <Grid size={size} style={{ textAlign }}>
      {children}
    </Grid>
  );
}
