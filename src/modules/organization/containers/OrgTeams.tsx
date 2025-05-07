import React from 'react';
import { useQuery } from '@apollo/client';
import { SectionContainer } from 'components/containers';
import { Spinner } from 'components/loaders';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import OrgTeamsList from '../components/OrgTeamsList';
import { GET_TEAMS_BY_ORG } from '../graphql';

const OrgTeams: React.FC = () => {
  const { orgId } = useCustomParams();
  const { data, error, loading } = useQuery(GET_TEAMS_BY_ORG, {
    variables: { orgId },
  });

  if (error) return <ErrorGraphql error={[error]} />;
  return (
    <SectionContainer title="Teams">
      {!loading ? <OrgTeamsList teams={data.teams} /> : <Spinner />}
    </SectionContainer>
  );
};

export default OrgTeams;
