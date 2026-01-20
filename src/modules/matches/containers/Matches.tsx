import { useQuery } from '@apollo/client';

import { FETCH_MATCHES } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import MatchesView from '../views/MatchesView';

export default function Matches() {
  const { teamId } = useCustomParams();
  const { seasonId, seasonReady, loading: loadingSeasons } = useSeasons();

  const { data, error, loading } = useQuery(FETCH_MATCHES, {
    variables: { teamId, seasonId },
    notifyOnNetworkStatusChange: true,
    skip: !seasonId,
  });

  return (
    <MatchesView
      data={data}
      loading={loading || loadingSeasons}
      error={error}
      seasonReady={seasonReady}
    />
  );
}
