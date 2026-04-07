import type { TFunction } from 'i18next';
import { LINK_TYPE } from '../../../constants';

export const getSeasonAdminLinks = (t: TFunction<'teamseasons'>) => [
  {
    label: t('LINKS.ADD_AWARD'),
    type: LINK_TYPE.ADD,
    link: 'add_award',
  },
  {
    label: t('LINKS.EDIT_SEASON'),
    type: LINK_TYPE.EDIT,
    link: 'edit',
  },
];
