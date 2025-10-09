export interface IChangePasswordInput {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IEditProfileInput {
  username: string;
  email: string;
  dateOfBirth: string;
  nationality: string;
}

export interface IDeleteAccountInput {
  username: string;
}
