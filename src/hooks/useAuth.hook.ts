import { useSelector } from 'react-redux';
import { getAuth } from '../store/features/auth/authSelector.ts';

export const useAuth = (teamId?: string, orgId?: string) => {
  const { isAuth, isTeamAdmin, isSiteAdmin, teamIds, orgIds } = useSelector(getAuth);
  const isTeamAuth = teamId && teamIds && isTeamAdmin && teamIds.includes(teamId);

  const isOrgAuth = orgId && orgIds && orgIds.includes(orgId);
  return { isAuth, isTeamAdmin, isTeamAuth, isSiteAdmin, isOrgAuth };
};
