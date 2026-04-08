import type { TFunction } from 'i18next';
import { LINK_TYPE } from '../../../constants';

export const getAwardAdminLinks = (t: TFunction<'awards'>) => [
  {
    label: t('LINKS.EDIT_AWARD'),
    type: LINK_TYPE.EDIT,
    link: 'edit',
  },
];
