/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

import { visualizer } from 'rollup-plugin-visualizer';

import pkg from './package.json';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __ROOT_URL__: JSON.stringify(env.VITE_ROOT_URL),
    },
    plugins: [
      react(),
      // show bundle report only on production builds
      mode === 'production' &&
        visualizer({ filename: 'dist/stats.html', open: false, gzipSize: true }),
    ].filter(Boolean),
    server: {
      port: 3000,
    },
    base: '/',
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            // Split React and related libraries
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            // Apollo + Redux together to share Symbol.observable
            'state-vendor': ['@apollo/client', 'graphql', '@reduxjs/toolkit', 'react-redux'],
            // Split Material-UI into smaller chunks (with Emotion dependencies)
            'mui-core': [
              '@mui/material',
              '@mui/system',
              '@emotion/react',
              '@emotion/styled',
              '@emotion/cache',
            ],
            'mui-extras': ['@mui/x-charts', '@mui/x-date-pickers'],
            // Split form libraries
            'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
            // Split date utilities
            'date-vendor': ['date-fns'],
          },
        },
      },
    },
  };
});
