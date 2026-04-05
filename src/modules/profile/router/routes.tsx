import { lazy } from 'react';

export const Profile = lazy(() => import('../containers/Profile'));
export const EditUserImage = lazy(() => import('../containers/EditProfileImage'));
export const EditProfile = lazy(() => import('../containers/EditProfile'));
export const EditPassword = lazy(() => import('../containers/EditPassword'));
