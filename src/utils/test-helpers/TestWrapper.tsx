import { ThemeProvider } from '@mui/material/styles';
import { type ReactElement } from 'react';
import { theme } from '../../theme';

interface Props {
  children: ReactElement;
}

export default function TestWrapper({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
