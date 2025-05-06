import type { ISelectOptions } from './components/inputs/SelectInput';
import packageJSON from '../package.json';

const date = new Date();

export const API_URL = 'https://madrid-reds-6z4rr5ysna-pd.a.run.app';
export const GQL_URL = 'https://madrid-reds-6z4rr5ysna-pd.a.run.app';
export const VERSION: string = packageJSON.version;

export const BASE_YEAR = 2005;
export const MAX_YEAR = 2050;

export const CURRENT_YEAR: number = date.getFullYear();

export const AuthRoles = {
    NONE: 'none',
    PUBLIC: 'public',
    USER: 'user',
    TEAM_ADMIN: 'team_admin',
    ORG_ADMIN: 'org_admin',
    SITE_ADMIN: 'site_admin',
} as const;

export type TAuthRole = typeof AuthRoles[keyof typeof AuthRoles];

export const ImageTypes = {
    USER: 'user',
    TEAM: 'team',
    ORG: 'org',
} as const;

export type TImageType = typeof ImageTypes[keyof typeof ImageTypes];

export const LinkTypes = {
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
} as const;

export type TLinkType = typeof LinkTypes[keyof typeof LinkTypes];

export const ApiPaths = {
    USER: '/api/users',
    ADMIN: '/api/admin',
    PUBLIC: '/api/public',
} as const;

export type TApiPath = typeof ApiPaths[keyof typeof ApiPaths];

export const positionOptions: ISelectOptions[] = [
    { value: '', label: '' },
    { value: 'GK', label: 'Goalkeeper' },
    { value: 'DF', label: 'Defender' },
    { value: 'MF', label: 'Midfielder' },
    { value: 'FW', label: 'Forward' },
];

export const TabTypes = {
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
};

export type TTabType = typeof TabTypes[keyof typeof TabTypes];

export const BorderStyles = {
    STANDARD: 'standard' as const,
};

export type TBorderStyle = typeof BorderStyles[keyof typeof BorderStyles];

export const BackgroundStyles = {
    STATIC: 'static' as const,
};

export type TBackgroundStyle = typeof BackgroundStyles[keyof typeof BackgroundStyles];