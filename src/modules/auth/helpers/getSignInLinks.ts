import type { TFunction } from 'i18next';
import type { IListItem } from '../../../components/lists';
import { AUTH_PATHS } from '../router';

export const getSignInLinks = (t: TFunction<'auth'>): IListItem[] => [
  {
    label: t('LINKS.SIGN_IN_LABEL'),
    value: t('LINKS.SIGN_IN_VALUE'),
    link: AUTH_PATHS.SIGN_UP,
  },
  {
    label: t('LINKS.FORGOT_LABEL'),
    value: t('LINKS.FORGOT_VALUE'),
    link: AUTH_PATHS.FORGOT,
  },
];
