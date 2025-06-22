import React from 'react';
import { useQuery } from '@apollo/client';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { GET_TEAMS_BY_USER_ID } from '../graphql';
import ProfileTeamTabs from '../components/ProfileTeamTabs';

const ProfileTeams: React.FC = () => {
  const { data, loading, error } = useQuery(GET_TEAMS_BY_USER_ID);

  if (error) {
    return <ErrorGraphql error={error} />;
  }
  return loading ? <Spinner /> : <ProfileTeamTabs teams={data?.teams || []} />;
};

export default ProfileTeams;
