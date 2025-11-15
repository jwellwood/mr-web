import type { Preview } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';

import { theme } from '../src/theme';
import { alertsReducer } from '../src/store/features/alerts/alertsSlice';

const store = configureStore({
  reducer: alertsReducer,
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: { dark: { name: 'dark', value: '#0E0D0F' } },
    },
    a11y: {
      test: 'todo',
    },
  },
  initialGlobals: {
    backgrounds: {
      value: 'dark',
    },
  },
  decorators: [
    Story => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <div style={{ backgroundColor: 'transparent', minHeight: '100vh' }}>
              <Story />
            </div>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    ),
  ],
};

export default preview;
