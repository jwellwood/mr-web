import { TFunction } from 'i18next';
import { IListItem } from '../../../components/lists';
import { LINK_TYPE } from '../../../constants';
import { ORG_PATHS } from '../router';

export const getOrgAdminLinks = (t: TFunction): IListItem[] => [
  { label: t('LINKS.ADD_TEAM'), type: LINK_TYPE.ADD, link: ORG_PATHS.ADD_TEAM },
  {
    label: t('LINKS.ADD_COMPETITION'),
    type: LINK_TYPE.ADD,
    link: ORG_PATHS.ADD_COMPETITION,
  },
  {
    label: t('LINKS.ADD_SEASON'),
    type: LINK_TYPE.ADD,
    link: ORG_PATHS.ADD_ORG_SEASON,
  },
  { label: t('LINKS.EDIT_ORGANIZATION'), type: LINK_TYPE.EDIT, link: ORG_PATHS.EDIT },
  { label: t('LINKS.EDIT_ORG_BADGE'), type: LINK_TYPE.EDIT, link: ORG_PATHS.EDIT_BADGE },
];
