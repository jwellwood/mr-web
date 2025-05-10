import React from 'react';
import { useQuery } from '@apollo/client';
import { AUTH_ROLES, IMAGE_TYPE } from '../../../app/constants';
import ModuleHeader from '../../../components/common/ModuleHeader';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard';
import Organization from '../components/Organization';
import { GET_TEAM } from '../graphql';
import TeamTabs from './TeamTabs';

const TeamOverview: React.FC = () => {
  const { teamId } = useCustomParams();
  const { data, error, loading } = useQuery(GET_TEAM, {
    variables: { teamId },
  });

  const { teamName, teamBadge, location, country } = data?.team || {};

  if (error) return <ErrorGraphql error={error} />;
  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <ModuleHeader
        title={teamName}
        badge={teamBadge?.url}
        city={location}
        country={country}
        type={IMAGE_TYPE.TEAM}
        loading={loading}
      />
      <Organization team={data?.team} loading={loading} />
      <TeamTabs team={data?.team} loading={loading} />
    </RouteGuard>
  );
};

export default TeamOverview;
