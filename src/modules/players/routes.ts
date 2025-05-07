import { lazy } from 'react';

export const AddPlayer = lazy(() => import('./forms/AddPlayer'));
export const Squad = lazy(() => import('./containers/Squad'));
export const Player = lazy(() => import('./containers/Player'));
export const EditPlayer = lazy(() => import('./forms/EditPlayer'));
export const EditPlayerPhoto = lazy(() => import('./forms/EditPlayerImage'));
export const DeletePlayer = lazy(() => import('./forms/DeletePlayer'));
