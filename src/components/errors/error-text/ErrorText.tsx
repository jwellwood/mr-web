import { Alert, Typography } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function NoDataText({ children }: Props) {
  return (
    <Alert severity="warning">
      <Typography
        style={{
          textDecoration: 'none',
        }}
      >
        {children}
      </Typography>
    </Alert>
  );
}
