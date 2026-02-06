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
          manualChunks: id => {
            // Core dependencies that rarely change
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'react-vendor';
              }
              if (id.includes('@apollo/client') || id.includes('graphql')) {
                return 'apollo-vendor';
              }
              if (
                id.includes('@mui/material') ||
                id.includes('@mui/system') ||
                id.includes('@emotion')
              ) {
                return 'mui-core';
              }
              if (id.includes('@mui/x-')) {
                return 'mui-extras';
              }
              if (
                id.includes('react-hook-form') ||
                id.includes('zod') ||
                id.includes('@hookform')
              ) {
                return 'form-vendor';
              }
              if (id.includes('redux') || id.includes('react-redux')) {
                return 'redux-vendor';
              }
              if (id.includes('date-fns')) {
                return 'date-vendor';
              }
              if (id.includes('react-icons')) {
                return 'icons-vendor';
              }
              // All other node_modules
              return 'vendor';
            }

            // Split your app code by module
            if (id.includes('src/modules/')) {
              const moduleName = id.split('src/modules/')[1]?.split('/')[0];
              if (moduleName) {
                return `module-${moduleName}`;
              }
            }
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
