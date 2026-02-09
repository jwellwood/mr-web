import { Grid } from '@mui/material';
import { SxProps } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
  size?: number;
  textAlign?: string;
  alignContent?: string;
  alignItems?: string;
  justifyContent?: string;
  margin?: string;
}

// TODO: Im clueless here, some mui shit
const GridItem: React.FC<Props> = ({
  children,
  size,
  textAlign = 'center',
  alignContent = 'center',
  alignItems = 'center',
  justifyContent = 'center',
  margin,
}) => {
  return (
    <Grid
      size={size}
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
