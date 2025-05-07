import { lazy } from 'react';

export const AddMatch = lazy(() => import('./containers/AddMatch'));
export const Matches = lazy(() => import('./containers/Matches'));
export const Match = lazy(() => import('./containers/Match'));
export const EditMatch = lazy(() => import('./containers/EditMatch'));
export const DeleteMatch = lazy(() => import('./containers/DeleteMatch'));
