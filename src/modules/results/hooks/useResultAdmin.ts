import { useAuth, useCustomParams } from '../../../hooks';

export const useResultAdmin = (homeTeamId?: string, awayTeamId?: string) => {
  const { orgId } = useCustomParams();
  const { isTeamAuth: isHomeTeamAdmin } = useAuth(homeTeamId);
  const { isTeamAuth: isAwayTeamAdmin } = useAuth(awayTeamId);
  const { isOrgAuth } = useAuth('', orgId);

  const isAdminToEither = isHomeTeamAdmin || isAwayTeamAdmin || isOrgAuth;

  return { isAdminToEither, isHomeTeamAdmin, isAwayTeamAdmin, isOrgAuth };
};
