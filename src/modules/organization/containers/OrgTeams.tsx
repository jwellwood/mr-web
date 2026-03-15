import { useQuery } from '@apollo/client/react';
import { DataError } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { useCustomParams } from '../../../hooks';
import { FETCH_ORG_TEAMS } from '../graphql';
import OrgTeamsList from './OrgTeamsList';

export default function OrgTeams() {
  const { orgId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_ORG_TEAMS, {
    variables: { orgId: orgId! },
  });

  const renderContent = () => {
    return !loading ? <OrgTeamsList teams={data?.teams || []} /> : <Spinner />;
  };

  return error ? <DataError error={error} /> : renderContent();
}
