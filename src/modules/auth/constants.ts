import { IListItem } from '../../components/lists/types';
import { AUTH_PATHS } from './router';

export const pages = {
  SIGN_IN_PAGE: 'Sign In',
  SIGN_UP_PAGE: 'Sign Up',
  FORGOT_PASSWORD_PAGE: 'Forgot Password',
  RESEND_VERIFICATION_PAGE: 'Resend Verification Email',
  RESET_PASSWORD_PAGE: 'Reset Password',
  VALIDATED_EMAIL_PAGE: 'Validation',
  ADD_NEW_USER_PAGE: 'Add New User',
};

export const SIGN_IN_LINKS: IListItem[] = [
  {
    label: "Don't have an account yet?",
    value: 'Sign up here',
    link: AUTH_PATHS.SIGN_UP,
  },
  {
    label: 'Forgotten you password?',
    value: 'Reset here',
    link: AUTH_PATHS.FORGOT,
  },
];

export const SIGN_UP_LINKS: IListItem[] = [
  {
    label: 'Already have an account?',
    value: 'Sign in here',
    link: AUTH_PATHS.SIGN_IN,
  },
];
