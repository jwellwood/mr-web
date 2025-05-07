import { useSelector } from 'react-redux';
import * as Selectors from 'selectors';

export const useAuth = (teamId?: string) => {
  const { isAuth, isTeamAdmin, isSiteAdmin, teamIds, orgIds } = useSelector(
    Selectors.getAuthState
  );

  const isTeamAuth =
    teamId && teamIds && isTeamAdmin && teamIds.includes(teamId);

  const isOrgAuth = teamId && orgIds && orgIds.includes(teamId);

  return { isAuth, isTeamAdmin, isTeamAuth, isSiteAdmin, isOrgAuth };
};
