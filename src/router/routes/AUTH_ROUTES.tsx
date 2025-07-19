import { Route } from 'react-router-dom';
import { AUTH } from '../paths';
import {
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp,
  ValidatedEmail,
} from '../../modules/auth/routes.tsx';

export const AUTH_ROUTES = () => (
  <>
    <Route path={AUTH.SIGN_IN} element={<SignIn />} />
    <Route path={AUTH.SIGN_UP} element={<SignUp />} />
    <Route path={AUTH.FORGOT} element={<ForgotPassword />} />
    <Route path={AUTH.RESET} element={<ResetPassword />} />
    <Route path={AUTH.VERIFY} element={<ValidatedEmail />} />
  </>
);
