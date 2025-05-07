export interface IChangePasswordForm {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IDeleteAccountForm {
  username: string;
}

export interface IEditProfileForm {
  username: string;
  email: string;
  dateOfBirth: string;
  nationality: string;
}
