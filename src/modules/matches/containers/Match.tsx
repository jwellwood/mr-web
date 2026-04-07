import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { FETCH_MATCH } from '../graphql';
import MatchPage from '../pages/MatchPage';

export default function Match() {
  const { matchId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_MATCH, {
    variables: { matchId: matchId! },
  });

  return <MatchPage data={data} loading={loading} error={error} />;
}
