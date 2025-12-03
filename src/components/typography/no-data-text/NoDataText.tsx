import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Typography } from '@mui/material';

interface Props {
  children: React.ReactNode;
  link?: string;
}

export default function NoDataText({ children, link }: Props) {
  return (
    <Alert severity="info">
      <Typography
        style={{
          textDecoration: 'none',
        }}
        component={link ? Link : 'div'}
        to={link}
      >
        {children}
      </Typography>
    </Alert>
  );
}
