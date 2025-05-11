import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AUTH, PROFILE } from './paths';
import {useAuth} from "../hooks";
import {AUTH_ROLES, TAuthRoles} from "../app/constants.ts";
import {showAlert} from "../store/features/alerts/alertsSlice.ts";

interface Props {
  children: ReactNode;
  authorization: TAuthRoles;
  teamId?: string;
  orgId?: string;
}

const RouteGuard: React.FC<Props> = ({
  children,
  authorization,
  teamId,
  orgId,
}) => {
  console.log("RouteGuard")
  const dispatch = useDispatch();
  const { isTeamAdmin, isSiteAdmin, isTeamAuth, isAuth } = useAuth(teamId);
  const { isOrgAuth } = useAuth(orgId);

  if (authorization === AUTH_ROLES.USER && !isAuth) {
    return <Navigate to={AUTH.SIGN_IN} replace />;
  }
  if (authorization === AUTH_ROLES.ORG_ADMIN && !isOrgAuth) {
    dispatch(showAlert({ text: 'Only team admin users can access this page!', type: 'info' }));
    return <Navigate to={PROFILE.PROFILE} replace />;
  }
  if (authorization === AUTH_ROLES.TEAM_ADMIN && !isTeamAuth) {
    dispatch(showAlert({ text: 'You are not an admin for this team', type: 'info' }));
    return <Navigate to={PROFILE.PROFILE} replace />;
  }
  if (authorization === AUTH_ROLES.TEAM_ADMIN && !isTeamAdmin) {
    dispatch(showAlert({ text: 'Only team admin users can access this page!', type: 'info' }));
    return <Navigate to={PROFILE.PROFILE} replace />;
  }
  if (authorization === AUTH_ROLES.TEAM_ADMIN && !isTeamAuth) {
    dispatch(showAlert({ text: 'You are not an admin for this team', type: 'info' }));
    return <Navigate to={PROFILE.PROFILE} replace />;
  }
  if (authorization === AUTH_ROLES.SITE_ADMIN && !isSiteAdmin) {
    dispatch(showAlert({ text: 'Only admin users can access this page!', type: 'info' }));
    return <Navigate to={PROFILE.PROFILE} replace />;
  }
  if (isAuth && authorization === 'none')
    return <Navigate to={PROFILE.PROFILE} replace />;
  return <>{children}</>;
};

export default RouteGuard;