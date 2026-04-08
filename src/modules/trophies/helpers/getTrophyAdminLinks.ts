import type { TFunction } from 'i18next';
import { LINK_TYPE } from '../../../constants';

export const getTrophyAdminLinks = (t: TFunction<'trophies'>) => [
  {
    label: t('LINKS.EDIT_TROPHY'),
    type: LINK_TYPE.EDIT,
    link: 'edit',
  },
];
