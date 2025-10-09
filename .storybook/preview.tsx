import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../src/theme';

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
    (Story: any) => (
      <ThemeProvider theme={theme}>
        <div style={{ backgroundColor: 'transparent', minHeight: '100vh' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
