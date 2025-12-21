export const API_PATH = {
  USER: '/api/users',
  ADMIN: '/api/admin',
  PUBLIC: '/api/public',
} as const;

export type TApiPath = (typeof API_PATH)[keyof typeof API_PATH];
