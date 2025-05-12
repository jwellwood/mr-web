import React from 'react';
import Grid, { GridSize } from '@mui/material/Grid';
import { SxProps } from '@mui/material';

interface Props {
  children: React.ReactNode;
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  textAlign?: string;
  alignContent?: string;
  alignItems?: string;
  justifyContent?: string;
  margin?: string;
}

// TODO: Im clueless here, some mui shit
const GridItem: React.FC<Props> = ({
  children,
  // xs = 12,
  // sm = 6,
  // md = 6,
  // lg = 6,
  // xl = 6,
  textAlign = 'center',
  alignContent = 'center',
  alignItems = 'center',
  justifyContent = 'center',
  margin,
}) => {
  return (
    <Grid
      // item
      // xs={xs}
      // sm={sm}
      // md={md}
      // lg={lg}
      // xl={xl}
      sx={
        {
          textAlign,
          alignContent,
          alignItems,
          justifyContent,
          paddingTop: '4px !important',
          margin: margin,
        } as SxProps
      }
    >
      {children}
    </Grid>
  );
};

export default GridItem;
