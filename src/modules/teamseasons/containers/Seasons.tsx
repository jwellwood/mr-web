import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import SeasonsView from '../components/SeasonsView';
import { FETCH_SEASONS_POSITION } from '../graphql';

export default function Seasons() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SEASONS_POSITION, {
    variables: { teamId: teamId! },
  });

  return <SeasonsView data={data} loading={loading} error={error} />;
}
