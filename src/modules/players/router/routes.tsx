import { lazy } from 'react';

export const Player = lazy(() => import('../main'));
export const AddPlayer = lazy(() => import('../forms/AddPlayer'));
export const EditPlayer = lazy(() => import('../forms/EditPlayer'));
export const EditPlayerPhoto = lazy(() => import('../forms/EditPlayerImage'));
export const DeletePlayer = lazy(() => import('../forms/DeletePlayer'));
