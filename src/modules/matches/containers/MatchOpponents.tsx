import { useQuery } from '@apollo/client';

import { FETCH_MATCH_OPPONENTS } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import MatchOpponentsView from '../views/MatchOpponentsView';
import { useSeasons } from '../../../hooks';

export default function MatchOpponents() {
  const { teamId } = useCustomParams();
  const { seasonReady } = useSeasons();

  const { data, loading, error } = useQuery(FETCH_MATCH_OPPONENTS, {
    variables: { teamId },
  });

  return (
    <MatchOpponentsView data={data} loading={loading} error={error} seasonReady={seasonReady} />
  );
}
