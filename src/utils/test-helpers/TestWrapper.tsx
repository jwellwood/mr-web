import { ThemeProvider } from '@mui/material/styles';
import { type ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from '../../i18n/react-i18n';
import { store } from '../../store/store';
import { theme } from '../../theme';

interface Props {
  children: ReactElement;
}

export default function TestWrapper({ children }: Props) {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
}
