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
      sx={{
        background: theme.palette.dark.main,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CustomTypography color="data" bold link={link} align="center">
        {children}
      </CustomTypography>
    </Alert>
  );
}
