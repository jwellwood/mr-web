import { DeepOmitTypename } from '../../utils';
import { type Forgot_PasswordMutation } from './graphql/FORGOT_PASSWORD.generated';
import { type Log_Out_UserMutation } from './graphql/LOG_OUT_USER.generated';
import { type Register_UserMutation } from './graphql/REGISTER_USER.generated';
import { type Reset_PasswordMutation } from './graphql/RESET_PASSWORD.generated';
import { type Sign_In_UserMutation } from './graphql/SIGN_IN_USER.generated';

export type T_SIGN_IN_USER = DeepOmitTypename<Sign_In_UserMutation>;

export type T_REGISTER_USER = DeepOmitTypename<Register_UserMutation>;

export type T_LOG_OUT_USER = DeepOmitTypename<Log_Out_UserMutation>;

export type T_FORGOT_PASSWORD = DeepOmitTypename<Forgot_PasswordMutation>;

export type T_RESET_PASSWORD = DeepOmitTypename<Reset_PasswordMutation>;
