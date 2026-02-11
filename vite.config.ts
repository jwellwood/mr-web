/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
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
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'clover'],
        all: true,
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/**/*.test.{ts,tsx}',
          'src/**/*.spec.{ts,tsx}',
          'src/**/*.stories.{ts,tsx}',
          'src/**/test/**',
          'src/**/*.d.ts',
          'src/vite-env.d.ts',
          'src/vitest.d.ts',
          'src/main.tsx',
        ],
        thresholds: {
          lines: 15,
          functions: 10,
          branches: 12,
          statements: 15,
          autoUpdate: false,
        },
      },
    },
    server: {
      port: 3000,
    },
    base: '/',
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-redux'],
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            // Split React and related libraries (including react-redux to avoid duplicate React instances)
            'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-redux'],
            // Apollo + Redux together to share Symbol.observable
            'state-vendor': ['@apollo/client', 'graphql', '@reduxjs/toolkit'],
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
