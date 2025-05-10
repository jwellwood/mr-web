import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { HOME } from './paths';

interface Props {
  children: React.ReactNode;
  authorization?: string;
}

// This component checks if the user has the required authorization to access a route
// If not, it redirects to the home page
// For now, it's a simple implementation that allows all access
const RouteGuard: React.FC<Props> = ({ 
  children,
   
}) => {
  const location = useLocation();

  // For now, we'll allow all access since we don't have authentication implemented
  // In a real app, you would check the user's role against the required authorization
  const isAuthorized = true;

  if (!isAuthorized) {
    // Redirect to home page if not authorized, preserving the current location
    return <Navigate to={HOME.HOME} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
