import type { TFunction } from 'i18next';
import type { IListItem } from '../../../components/lists';
import { AUTH_PATHS } from '../router';

export const getSignUpLinks = (t: TFunction<'auth'>): IListItem[] => [
  {
    label: t('LINKS.SIGN_UP_LABEL'),
    value: t('LINKS.SIGN_UP_VALUE'),
    link: AUTH_PATHS.SIGN_IN,
  },
];
