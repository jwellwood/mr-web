import type { TFunction } from 'i18next';
import { LINK_TYPE } from '../../../constants';
import { ORG_PATHS } from '../../organization/router';
import { PROFILE_PATHS } from '../router';

export const getProfileAdminLinks = (t: TFunction<'profile'>) => [
  { label: t('LINKS.ADD_NEW_ORGANIZATION'), type: LINK_TYPE.ADD, link: ORG_PATHS.ADD },
  { label: t('LINKS.EDIT_PROFILE'), type: LINK_TYPE.EDIT, link: PROFILE_PATHS.EDIT },
  { label: t('LINKS.EDIT_IMAGE'), type: LINK_TYPE.EDIT, link: PROFILE_PATHS.EDIT_IMAGE },
  {
    label: t('LINKS.CHANGE_PASSWORD'),
    type: LINK_TYPE.EDIT,
    link: PROFILE_PATHS.CHANGE_PASSWORD,
  },
];
