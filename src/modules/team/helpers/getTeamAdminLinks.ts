import type { TFunction } from 'i18next';
import { LINK_TYPE } from '../../../constants';

export const getTeamAdminLinks = (t: TFunction<'team'>) => [
  { label: t('LINKS.ADD_MATCH'), type: LINK_TYPE.ADD, link: 'add_match' },
  { label: t('LINKS.ADD_SEASON'), type: LINK_TYPE.ADD, link: `add_season` },
  { label: t('LINKS.ADD_PLAYER'), type: LINK_TYPE.ADD, link: `add_player` },
  {
    label: t('LINKS.ADD_TROPHY'),
    type: LINK_TYPE.ADD,
    link: `add_trophy`,
  },
  {
    label: t('LINKS.EDIT_TEAM'),
    type: LINK_TYPE.EDIT,
    link: `edit`,
  },
  {
    label: t('LINKS.EDIT_TEAM_BADGE'),
    type: LINK_TYPE.EDIT,
    link: `edit_badge`,
  },
];
