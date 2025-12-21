import React from 'react';
import Container from '@mui/material/Container';

import { theme } from '../../../theme';

interface Props {
  children: React.ReactNode;
}

export default function BackgroundContainer({ children }: Props) {
  return (
    <Container
      maxWidth={false}
      sx={{
        width: '100%',
        background: theme.palette.dark.main,
        color: theme.palette.common.white,
        height: '100vh',
        overflow: 'auto',
        padding: '2px',
      }}
    >
      <Container maxWidth="md">{children}</Container>
    </Container>
  );
}
