export * from './dates';
export * from './images';
export * from './api';
export * from './links';
export * from './tabs';
export * from './auth';
export * from './position';
export * from './styles';
export * from './rounds';

const _processEnv =
  typeof process !== 'undefined' ? (process.env as Record<string, string | undefined>) : {};

export const ROOT_URL: string =
  typeof __ROOT_URL__ !== 'undefined'
    ? __ROOT_URL__
    : (_processEnv.VITE_ROOT_URL as string) ||
      'https://madrid-reds-1035582858411.northamerica-northeast2.run.app';

export const VERSION: string =
  typeof __APP_VERSION__ !== 'undefined'
    ? __APP_VERSION__
    : (_processEnv.VITE_APP_VERSION as string) || '0.0.0';
