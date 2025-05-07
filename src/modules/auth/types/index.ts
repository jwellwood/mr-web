export interface IForgotPasswordForm {
  email: string;
}

export interface IResetPasswordForm {
  password: string;
  confirmPassword: string;
}

export interface ISignInForm {
  email: string;
  password: string;
}

export interface ISignUpForm {
  username: string;
  email: string;
  password: string;
}
