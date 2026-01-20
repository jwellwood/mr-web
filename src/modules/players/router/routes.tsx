import { lazy } from 'react';

export const Player = lazy(() => import('../main'));
export const AddPlayer = lazy(() => import('../forms/add-player/AddPlayer'));
export const EditPlayer = lazy(() => import('../forms/add-player/EditPlayer'));
export const EditPlayerPhoto = lazy(() => import('../forms/player-image/EditPlayerImage'));
