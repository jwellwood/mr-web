export const APP_ICONS = {
  MENU: 'menu',
  BACK: 'back',
  LOADING: 'loading',
  BADGE: 'badge',
  FLAG: 'flag',
  USER: 'user',
  DELETE: 'delete',
  LOCATION: 'location',
  FILTER: 'filter',
  MEDAL: 'medal',
  TROPHY: 'trophy',
  AWARD: 'star',
  OVERVIEW: 'overview',
  SQUAD: 'squad',
  MATCHES: 'results',
  HISTORY: 'history',
  NATIONALITY: 'nationality',
} as const;

export type AppIconType = (typeof APP_ICONS)[keyof typeof APP_ICONS];
