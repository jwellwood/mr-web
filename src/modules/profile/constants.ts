import { IChangePasswordForm, IDeleteAccountForm } from './types';

export const changePasswordFormState: IChangePasswordForm = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

export const deleteAccountFormState: IDeleteAccountForm = {
  username: '',
};

export const pages = {
  USER_PROFILE_PAGE: 'Profile',
  EDIT_PROFILE_PAGE: 'Edit Profile',
  EDIT_USER_IMAGE_PAGE: 'Edit Photo',
  CHANGE_PASSWORD_PAGE: 'Change Password',
  DELETE_ACCOUNT: 'Delete Account',
};
