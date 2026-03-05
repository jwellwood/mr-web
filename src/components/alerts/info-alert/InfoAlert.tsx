import { Alert } from '@mui/material';
import React from 'react';
import { theme } from '../../../theme';
import { CustomTypography } from '../../typography';

interface Props {
  children: React.ReactNode | string;
}

export default function InfoAlert({ children }: Props) {
  return (
    <Alert
      severity="info"
      icon={false}
      variant="outlined"
      sx={{ background: theme.palette.dark.main }}
    >
      <CustomTypography color="data">{children}</CustomTypography>
    </Alert>
  );
}
