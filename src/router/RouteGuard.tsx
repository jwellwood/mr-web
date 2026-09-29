import { ReactNode, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthLoader } from '../components/loaders';
import { AUTH_ROLES, TAuthRoles } from '../constants';
import { useAuth, useCustomParams } from '../hooks';
import { AUTH_PATHS } from '../modules/auth/router';
import { PROFILE_PATHS } from '../modules/profile/router';
import { showAlert } from '../store';
import { AuthBootstrapContext } from './AuthBootstrapContext';

interface Props {
  children: ReactNode;
  authorization: TAuthRoles;
}

export default function RouteGuard({ children, authorization }: Props) {
  const dispatch = useDispatch();
  const { teamId, orgId } = useCustomParams();
  const { hasRetryableError, retry } = useContext(AuthBootstrapContext);
  const { isTeamAdmin, isSiteAdmin, isTeamAuth, isOrgAuth, isAuth, authInitialized } = useAuth(
    teamId,
    orgId
  );

  const PROFILE = PROFILE_PATHS.PROFILE;

  // Public routes do not need to wait for auth hydration.
  if (!authInitialized && authorization !== AUTH_ROLES.PUBLIC) {
    return <AuthLoader onRetry={hasRetryableError ? retry : undefined} />;
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
