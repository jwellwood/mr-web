export * from './dates';
export * from './images';
export * from './api';
export * from './links';
export * from './tabs';
export * from './auth';
export * from './position';
export * from './rounds';

export const ROOT_URL: string =
  typeof __ROOT_URL__ !== 'undefined'
    ? __ROOT_URL__
    : import.meta.env.VITE_ROOT_URL ||
      'https://madrid-reds-1035582858411.northamerica-northeast2.run.app';

export const VERSION: string =
  typeof __APP_VERSION__ !== 'undefined'
    ? __APP_VERSION__
    : import.meta.env.VITE_APP_VERSION || '0.0.0';
