import { IChangePasswordInput, IDeleteAccountInput } from '../types';

export const changePasswordFormState: IChangePasswordInput = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

export const deleteAccountFormState: IDeleteAccountInput = {
  username: '',
};
