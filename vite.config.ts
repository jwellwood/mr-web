/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { visualizer } from 'rollup-plugin-visualizer';

import pkg from './package.json';
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

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
            // Split Apollo Client
            'apollo-vendor': ['@apollo/client', 'graphql'],
            // Split Material-UI into smaller chunks
            'mui-core': ['@mui/material', '@mui/system'],
            'mui-extras': ['@mui/x-charts', '@mui/x-date-pickers'],
            // Split form libraries
            'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
            // Split Redux
            'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
            // Split date utilities
            'date-vendor': ['date-fns'],
          },
        },
      },
    },
    test: {
      projects: [
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: 'playwright',
              instances: [
                {
                  browser: 'chromium',
                },
              ],
            },
            setupFiles: ['.storybook/vitest.setup.ts'],
          },
        },
      ],
    },
  };
});
