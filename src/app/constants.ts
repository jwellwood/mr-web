import packageJSON from '../../package.json';

const date = new Date();

export const ROOT_URL = 'https://madrid-reds-6z4rr5ysna-pd.a.run.app';
export const VERSION: string = packageJSON.version;

export const BASE_YEAR = 2005;
export const MAX_YEAR = 2050;

export const CURRENT_YEAR: number = date.getFullYear();

export const AUTH_ROLES = {
  NONE: 'none',
  PUBLIC: 'public',
  USER: 'user',
  TEAM_ADMIN: 'team_admin',
  ORG_ADMIN: 'org_admin',
  SITE_ADMIN: 'site_admin',
} as const;

export type TAuthRoles = typeof AUTH_ROLES[keyof typeof AUTH_ROLES];

export const IMAGE_TYPE = {
  USER: 'user',
  TEAM: 'team',
  ORG: 'org',
} as const;

export type TImageType = typeof IMAGE_TYPE[keyof typeof IMAGE_TYPE];

export const LINK_TYPE = {
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
} as const;

export type TLinkType = typeof LINK_TYPE[keyof typeof LINK_TYPE];

export const API_PATH = {
  USER: '/api/users',
  ADMIN: '/api/admin',
  PUBLIC: '/api/public',
} as const;

export type TApiPath = typeof API_PATH[keyof typeof API_PATH];

export const positionOptions = [
  { value: '', label: '' },
  { value: 'GK', label: 'Goalkeeper' },
  { value: 'DF', label: 'Defender' },
  { value: 'MF', label: 'Midfielder' },
  { value: 'FW', label: 'Forward' },
] as const;

export const TAB_TYPES = {
  PROFILE: 'profile',
  ORG: 'org',
  ORG_TEAMS: 'orgTeams',
  TEAM: 'team',
  OVERVIEW: 'overview',
  MATCHES: 'matches',
  MATCH: 'match',
  SQUAD: 'squad',
  PLAYER: 'player',
  HISTORY: 'history',
  SEASON: 'season',
} as const;

export type TTabType = typeof TAB_TYPES[keyof typeof TAB_TYPES];

export const BORDER_STYLE = {
  STANDARD: 'standard' as const,
};

export const BACKGROUND_STYLE = {
  STATIC: 'static' as const,
};