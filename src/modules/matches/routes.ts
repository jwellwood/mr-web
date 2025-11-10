import { lazy } from 'react';

export const Matches = lazy(() => import('./containers/Matches'));
export const Match = lazy(() => import('./containers/Match'));
export const AddMatch = lazy(() => import('./forms/AddMatch'));
export const EditMatch = lazy(() => import('./forms/EditMatch'));
export const DeleteMatch = lazy(() => import('./forms/DeleteMatch'));
