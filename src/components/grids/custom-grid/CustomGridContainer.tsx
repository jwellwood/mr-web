import Grid from '@mui/material/Grid';
import React from 'react';

interface Props {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  spacing?: number;
}
export default function CustomGridContainer({ children, direction = 'row', spacing = 1 }: Props) {
  return (
    <Grid
      container
      spacing={spacing}
      direction={direction}
      alignContent="center"
      alignItems="center"
    >
      {children}
    </Grid>
  );
}
