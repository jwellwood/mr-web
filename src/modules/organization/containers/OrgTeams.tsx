import { useQuery } from '@apollo/client';

import { FETCH_ORG_TEAMS } from '../graphql';

import { Spinner } from '../../../components/loaders';
import { useCustomParams } from '../../../hooks/useCustomParams';
import OrgTeamsList from '../components/OrgTeamsList';
import { DataError } from '../../../components';

export default function OrgTeams() {
  const { orgId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_ORG_TEAMS, {
    variables: { orgId },
  });

  const renderContent = () => {
    return !loading ? <OrgTeamsList teams={data?.teams || []} /> : <Spinner />;
  };

  return error ? <DataError error={error} /> : renderContent();
}
