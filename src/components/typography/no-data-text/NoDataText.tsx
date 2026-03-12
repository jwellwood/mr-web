import { Alert } from '@mui/material';
import React from 'react';
import { theme } from '../../../theme';
import CustomTypography from '../custom-typography/CustomTypography';

interface Props {
  children: React.ReactNode;
  link?: string;
}

export default function NoDataText({ children, link }: Props) {
  return (
    <Alert
      severity="info"
      variant="outlined"
      icon={false}
      sx={{ background: theme.palette.dark.main }}
    >
      <CustomTypography color="data" bold link={link}>
        {children}
      </CustomTypography>
    </Alert>
  );
}
