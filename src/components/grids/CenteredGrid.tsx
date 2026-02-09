import { Grid, GridDirection, GridSpacing } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
  dir?: GridDirection;
  just?: 'center' | 'flex-start' | 'flex-end' | 'space-evenly' | 'space-between';
  cont?: 'center' | 'flex-start' | 'flex-end';
  item?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  spacing?: GridSpacing;
}

const CenteredGrid: React.FC<Props> = ({
  children,
  dir = 'column',
  just = 'center',
  cont = 'center',
  item = 'center',
  spacing = 1,
}) => {
  return (
    <Grid
      container
      direction={dir}
      columns={12}
      sx={{
        justifyContent: just,
        alignItems: item,
        alignContent: cont,
      }}
      spacing={spacing}
    >
      {children}
    </Grid>
  );
};

export default CenteredGrid;
