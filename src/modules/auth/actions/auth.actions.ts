import { AUTH_ROLES } from 'app/constants';

export const SET_AUTH = 'SET_AUTH';

export const setAuth = (
  roles: string[],
  teamIds?: string[],
  orgIds?: string[]
) => {
  const isAuth = roles && roles.includes(AUTH_ROLES.USER);
  const isTeamAdmin = roles && roles.includes(AUTH_ROLES.TEAM_ADMIN);
  const isOrgAdmin = roles && roles.includes(AUTH_ROLES.ORG_ADMIN);
  const isSiteAdmin = roles && roles.includes(AUTH_ROLES.SITE_ADMIN);

  return {
    type: SET_AUTH,
    payload: { isTeamAdmin, isSiteAdmin, isOrgAdmin, isAuth, teamIds, orgIds },
  };
};
