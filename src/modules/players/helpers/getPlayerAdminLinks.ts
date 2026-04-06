import type { TFunction } from 'i18next';
import { LINK_TYPE } from '../../../constants';

export const getPlayerAdminLinks = (t: TFunction<'players'>) => [
  {
    label: t('LINKS.EDIT_PLAYER'),
    type: LINK_TYPE.EDIT,
    link: 'edit',
  },
  {
    label: t('LINKS.EDIT_PLAYER_PHOTO'),
    type: LINK_TYPE.EDIT,
    link: 'edit_photo',
  },
];
