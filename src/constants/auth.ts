export const AUTH_ROLES = {
  NONE: 'none',
  PUBLIC: 'public',
  USER: 'user',
  TEAM_ADMIN: 'team_admin',
  ORG_ADMIN: 'org_admin',
  SITE_ADMIN: 'site_admin',
} as const;

export type TAuthRoles = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];
