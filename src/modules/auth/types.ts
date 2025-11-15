import { TAuthRoles } from '../../app/constants.ts';
import { IImage } from '../../components/avatars/image-avatar/types.ts';

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  roles: TAuthRoles[];
  description?: string;
  dateOfBirth?: string;
  nationality?: string;
  image: IImage;
  isVerified: boolean;
  teamIds: string[];
  orgIds: string[];
  createdAt: string;
  updatedAt: string;
  token?: string;
}

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
