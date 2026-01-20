import { lazy } from 'react';

export const SignIn = lazy(() => import('../forms/sign-in/SignIn'));
export const SignUp = lazy(() => import('../forms/sign-up/SignUp'));
export const ForgotPassword = lazy(() => import('../forms/forgot-password/ForgotPassword'));
export const ResetPassword = lazy(() => import('../forms/reset-password/ResetPassword'));

export const ValidatedEmail = lazy(() => import('../containers/ValidatedEmail'));
