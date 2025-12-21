import React from 'react';
import { Alert, Typography } from '@mui/material';

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
