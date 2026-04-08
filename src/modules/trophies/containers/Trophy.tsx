import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks';
import { FETCH_TROPHY } from '../graphql';
import TrophyPage from '../pages/TrophyPage';

export default function Trophy() {
  const { trophyId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_TROPHY, {
    variables: { trophyId: trophyId! },
  });

  return <TrophyPage data={data} loading={loading} error={error} />;
}
