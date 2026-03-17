import { ThemeProvider } from '@mui/material/styles';
import { type ReactElement } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { theme } from '../../theme';

interface Props {
  children: ReactElement;
}

export default function TestWrapper({ children }: Props) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
}
