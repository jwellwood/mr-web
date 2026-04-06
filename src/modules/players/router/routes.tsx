import { lazy } from 'react';

export const Player = lazy(() => import('../pages/PlayerPage'));
export const AddPlayer = lazy(() => import('../containers/AddPlayer'));
export const EditPlayer = lazy(() => import('../containers/EditPlayer'));
export const EditPlayerPhoto = lazy(() => import('../containers/EditPlayerImage'));
