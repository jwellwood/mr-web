import { LINK_TYPE } from '../../app/constants';
import { ORG_PATHS } from '../organization/router';
import { PROFILE_PATHS } from './router';

export const pages = {
  USER_PROFILE_PAGE: 'Profile',
  EDIT_PROFILE_PAGE: 'Edit Profile',
  EDIT_USER_IMAGE_PAGE: 'Edit Photo',
  CHANGE_PASSWORD_PAGE: 'Change Password',
  DELETE_ACCOUNT: 'Delete Account',
};

export const PROFILE_ADMIN_LINKS = [
  { label: 'Add New Organization', type: LINK_TYPE.ADD, link: ORG_PATHS.ADD },
  { label: 'Edit Profile', type: LINK_TYPE.EDIT, link: PROFILE_PATHS.EDIT },
  { label: 'Edit Image', type: LINK_TYPE.EDIT, link: PROFILE_PATHS.EDIT_IMAGE },
  {
    label: 'Change Password',
    type: LINK_TYPE.EDIT,
    link: PROFILE_PATHS.CHANGE_PASSWORD,
  },
  { label: 'Delete Account', type: LINK_TYPE.DELETE, link: PROFILE_PATHS.DELETE },
];
