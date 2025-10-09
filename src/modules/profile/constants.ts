import { LINK_TYPE } from '../../app/constants';
import { ORG, PROFILE } from '../../router/paths';

export const pages = {
  USER_PROFILE_PAGE: 'Profile',
  EDIT_PROFILE_PAGE: 'Edit Profile',
  EDIT_USER_IMAGE_PAGE: 'Edit Photo',
  CHANGE_PASSWORD_PAGE: 'Change Password',
  DELETE_ACCOUNT: 'Delete Account',
};

export const PROFILE_ADMIN_LINKS = [
  { label: 'Add New Organization', type: LINK_TYPE.ADD, link: ORG.ADD },
  { label: 'Edit Profile', type: LINK_TYPE.EDIT, link: PROFILE.EDIT },
  { label: 'Edit Image', type: LINK_TYPE.EDIT, link: PROFILE.EDIT_IMAGE },
  {
    label: 'Change Password',
    type: LINK_TYPE.EDIT,
    link: PROFILE.CHANGE_PASSWORD,
  },
  { label: 'Delete Account', type: LINK_TYPE.DELETE, link: PROFILE.DELETE },
];
