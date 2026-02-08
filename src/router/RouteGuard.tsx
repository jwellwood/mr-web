import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useAuth, useCustomParams } from '../hooks';
import { AUTH_ROLES, TAuthRoles } from '../constants';
import { showAlert } from '../store';
import { AUTH_PATHS } from '../modules/auth/router';
import { PROFILE_PATHS } from '../modules/profile/router';
import { AuthLoader } from '../components/loaders';

interface Props {
  children: ReactNode;
  authorization: TAuthRoles;
}

export default function RouteGuard({ children, authorization }: Props) {
  const dispatch = useDispatch();
  const { teamId, orgId } = useCustomParams();
  const { isTeamAdmin, isSiteAdmin, isTeamAuth, isOrgAuth, isAuth, authInitialized } = useAuth(
    teamId,
    orgId
  );

  const PROFILE = PROFILE_PATHS.PROFILE;

  // Wait for auth to be initialized before making routing decisions
  if (!authInitialized) {
    return <AuthLoader />;
  }

  if (authorization === AUTH_ROLES.USER && !isAuth) {
    return <Navigate to={AUTH_PATHS.SIGN_IN} replace />;
  }
  if (authorization === AUTH_ROLES.ORG_ADMIN && !isOrgAuth) {
    dispatch(showAlert({ text: 'Only team admin users can access this page!', type: 'info' }));
    return <Navigate to={PROFILE} replace />;
  }
  if (authorization === AUTH_ROLES.TEAM_ADMIN && !isTeamAuth) {
    dispatch(showAlert({ text: 'You are not an admin for this team', type: 'info' }));
    return <Navigate to={PROFILE} replace />;
  }
  if (authorization === AUTH_ROLES.TEAM_ADMIN && !isTeamAdmin) {
    dispatch(showAlert({ text: 'Only team admin users can access this page!', type: 'info' }));
    return <Navigate to={PROFILE} replace />;
  }
  if (authorization === AUTH_ROLES.SITE_ADMIN && !isSiteAdmin) {
    dispatch(showAlert({ text: 'Only admin users can access this page!', type: 'info' }));
    return <Navigate to={PROFILE} replace />;
  }
  if (isAuth && authorization === 'none') return <Navigate to={PROFILE} replace />;
  return <>{children}</>;
}
