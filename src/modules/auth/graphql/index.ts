import { DeepOmitTypename } from '../../../utils';
import { type Forgot_PasswordMutation, Forgot_PasswordDocument } from './FORGOT_PASSWORD.generated';
import { type Log_Out_UserMutation, Log_Out_UserDocument } from './LOG_OUT_USER.generated';
import { type Register_UserMutation, Register_UserDocument } from './REGISTER_USER.generated';
import {
  type Resend_Verification_EmailMutation,
  Resend_Verification_EmailDocument,
} from './RESEND_VERIFICATION_EMAIL.generated';
import { type Reset_PasswordMutation, Reset_PasswordDocument } from './RESET_PASSWORD.generated';
import { type Sign_In_UserMutation, Sign_In_UserDocument } from './SIGN_IN_USER.generated';
import { type Verify_EmailMutation, Verify_EmailDocument } from './VERIFY_EMAIL.generated';

export {
  Sign_In_UserDocument as SIGN_IN_USER,
  Forgot_PasswordDocument as FORGOT_PASSWORD,
  Log_Out_UserDocument as LOG_OUT_USER,
  Register_UserDocument as REGISTER_USER,
  Reset_PasswordDocument as RESET_PASSWORD,
  Verify_EmailDocument as VERIFY_EMAIL,
  Resend_Verification_EmailDocument as RESEND_VERIFICATION_EMAIL,
};

export type T_SIGN_IN_USER = DeepOmitTypename<Sign_In_UserMutation>;
export type T_REGISTER_USER = DeepOmitTypename<Register_UserMutation>;
export type T_LOG_OUT_USER = DeepOmitTypename<Log_Out_UserMutation>;
export type T_FORGOT_PASSWORD = DeepOmitTypename<Forgot_PasswordMutation>;
export type T_RESET_PASSWORD = DeepOmitTypename<Reset_PasswordMutation>;
export type T_VERIFY_EMAIL = DeepOmitTypename<Verify_EmailMutation>;
export type T_RESEND_VERIFICATION_EMAIL = DeepOmitTypename<Resend_Verification_EmailMutation>;
