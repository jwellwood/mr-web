import Grid from '@mui/material/Grid';
import React from 'react';

interface Props {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  spacing?: number;
  alignItems?: 'flex-start' | 'center' | 'flex-end';
}
export default function CustomGridContainer({
  children,
  direction = 'row',
  spacing = 1,
  alignItems = 'center',
}: Props) {
  return (
    <Grid
      container
      spacing={spacing}
      direction={direction}
      alignItems={alignItems}
      alignContent="center"
    >
      {children}
    </Grid>
  );
}
