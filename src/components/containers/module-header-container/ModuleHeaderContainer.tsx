import { Box } from '@mui/material';
import React from 'react';
import { theme } from '../../../theme';

interface Props {
  children: React.ReactNode;
}

export default function ModuleHeaderContainer({ children }: Props) {
  const { spacing } = theme;

  return <Box sx={{ my: spacing(4) }}>{children}</Box>;
}
