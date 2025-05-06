import React, { ReactElement } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import 'theme/material';
import { theme } from 'theme';

interface Props {
  children: ReactElement;
}

const ThemeWrapper: React.FC<Props> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ThemeWrapper;
