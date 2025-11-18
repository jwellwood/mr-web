import { lazy } from 'react';

export const SignIn = lazy(() => import('../containers/SignIn'));
export const SignUp = lazy(() => import('../containers/SignUp'));
export const ValidatedEmail = lazy(() => import('../containers/ValidatedEmail'));
export const ForgotPassword = lazy(() => import('../containers/ForgotPassword'));
export const ResetPassword = lazy(() => import('../containers/ResetPassword'));
