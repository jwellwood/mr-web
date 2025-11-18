import { useQuery } from '@apollo/client';

import { FETCH_ORG_TEAMS } from '../graphql';

import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import OrgTeamsList from '../components/OrgTeamsList';

export default function OrgTeams() {
  const { orgId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_ORG_TEAMS, {
    variables: { orgId },
  });

  const renderContent = () => {
    return !loading ? <OrgTeamsList teams={data?.teams || []} /> : <Spinner />;
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
