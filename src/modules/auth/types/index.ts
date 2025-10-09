export interface IForgotPasswordInput {
  email: string;
}

export interface IResetPasswordInput {
  password: string;
  confirmPassword: string;
}

export interface ISignInInput {
  email: string;
  password: string;
}

export interface ISignUpInput {
  username: string;
  email: string;
  password: string;
}
