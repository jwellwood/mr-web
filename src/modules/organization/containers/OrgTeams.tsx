import { useQuery } from '@apollo/client/react';
import { useSearchParams } from 'react-router-dom';
import { DataError } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TAB_TYPES } from '../../../constants';
import { useCustomParams } from '../../../hooks';
import OrgTeamsList from '../components/OrgTeamsList';
import { FETCH_ORG_TEAMS } from '../graphql';

export default function OrgTeams() {
  const { orgId } = useCustomParams();
  const [searchParams] = useSearchParams();
  const includeInactive = Number(searchParams.get(TAB_TYPES.ORG_TEAMS) ?? 0) === 1;

  const { data, error, loading } = useQuery(FETCH_ORG_TEAMS, {
    variables: { orgId: orgId!, includeInactive },
  });

  const renderContent = () => {
    return !loading ? <OrgTeamsList teams={data?.teams || []} /> : <Spinner />;
  };

  return error ? <DataError error={error} /> : renderContent();
}
