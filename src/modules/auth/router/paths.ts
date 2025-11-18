export const AUTH_PATHS = {
  SIGN_IN: '/sign_in',
  SIGN_UP: '/sign_up',
  FORGOT: '/forgot_password',
  RESET: '/reset_password/:token',
  VERIFY: '/verify_email/:token',
} as const;
