import { type IListItem } from '../../components/lists';
import { AUTH_PATHS } from './router';

export const SIGN_IN_LINKS: IListItem[] = [
  {
    label: 'auth:LINKS.SIGN_IN_LABEL',
    value: 'auth:LINKS.SIGN_IN_VALUE',
    link: AUTH_PATHS.SIGN_UP,
  },
  {
    label: 'auth:LINKS.FORGOT_LABEL',
    value: 'auth:LINKS.FORGOT_VALUE',
    link: AUTH_PATHS.FORGOT,
  },
];

export const SIGN_UP_LINKS: IListItem[] = [
  {
    label: 'auth:LINKS.SIGN_UP_LABEL',
    value: 'auth:LINKS.SIGN_UP_VALUE',
    link: AUTH_PATHS.SIGN_IN,
  },
];
