import React, { ReactNode } from 'react';
import { Grid, Paper } from '@mui/material';
import { CustomTypography } from '../typography';
import { theme } from '../../theme';

interface Props {
  title?: string | ReactNode;
  border?: string;
  background?: string;
  children: React.ReactNode;
}

const SectionContainer: React.FC<Props> = ({ title, children, border, background }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: theme.spacing(0.5),
        margin: theme.spacing(0.25),
        background: background || theme.palette.dark.main,
        border: border ? `${border} 0.5px solid` : undefined,
        borderBottom: border ? undefined : `0.5px solid ${theme.palette.grey[900]}`,
      }}
    >
      <Grid
        container
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <CustomTypography color="data" size="sm" bold>
          {title}
        </CustomTypography>
      </Grid>
      {children}
    </Paper>
  );
};

export default SectionContainer;
