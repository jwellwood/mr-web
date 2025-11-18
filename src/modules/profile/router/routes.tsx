import { lazy } from 'react';

export const Profile = lazy(() => import('../containers/Profile.container'));
export const EditProfile = lazy(() => import('../containers/EditProfile.container'));
export const EditUserImage = lazy(() => import('../containers/EditUserImage.container'));
export const EditPassword = lazy(() => import('../containers/EditPassword.container'));
export const DeleteAccount = lazy(() => import('../containers/DeleteAccount.container'));
