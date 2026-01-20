import { lazy } from 'react';

export const Profile = lazy(() => import('../containers/Profile'));
export const EditUserImage = lazy(() => import('../forms/edit-profile-image/EditProfileImage'));
export const EditProfile = lazy(() => import('../forms/edit-profile/EditProfile'));
export const EditPassword = lazy(() => import('../forms/edit-password/EditPassword'));
export const DeleteAccount = lazy(() => import('../forms/delete-account/DeleteAccount'));
