import { TFunction } from 'i18next';
import { LINK_TYPE } from '../../../constants';
import { ORG_PATHS } from '../../organization/router';

export const getSeasonAdminLinks = (t: TFunction, orgId?: string, orgSeasonId?: string) => [
  {
    label: t('LINKS.ADD_RESULT'),
    type: LINK_TYPE.ADD,
    link: `/org/${orgId}/org_admin/org_season/${orgSeasonId}/${ORG_PATHS.ADD_RESULT}`,
  },
  {
    label: t('LINKS.ADD_GAMEWEEK'),
    type: LINK_TYPE.ADD,
    link: `/org/${orgId}/org_admin/org_season/${orgSeasonId}/${ORG_PATHS.ADD_GAME_WEEK}`,
  },
  {
    label: t('LINKS.EDIT_SEASON'),
    type: LINK_TYPE.EDIT,
    link: `/org/${orgId}/org_admin/org_season/${orgSeasonId}/${ORG_PATHS.EDIT_ORG_SEASON}`,
  },
];
