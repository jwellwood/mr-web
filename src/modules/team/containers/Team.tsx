import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import TeamView from '../components/TeamView';
import { FETCH_TEAM } from '../graphql';

export default function Team() {
  const { teamId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_TEAM, {
    variables: { teamId: teamId! },
  });

  return <TeamView data={data} loading={loading} error={error} />;
}
