import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_MATCH_OPPONENTS } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import MatchOpponentsView from '../components/matches-opponents/MatchOpponentsView';
import { useSeasons } from '../../../hooks';
import { MatchOpponentsContext, TMatchOpponentFilters } from '../context';

export default function MatchOpponents() {
  const [filters, setFilters] = useState<TMatchOpponentFilters>({
    includeForfeits: true,
    showAllTeams: false,
  });
  const { teamId } = useCustomParams();
  const { seasonReady } = useSeasons();

  const { data, loading, error } = useQuery(FETCH_MATCH_OPPONENTS, {
    variables: {
      teamId: teamId!,
      showAllTeams: filters.showAllTeams,
      includeForfeits: filters.includeForfeits,
    },
    fetchPolicy: 'network-only',
  });

  return (
    <MatchOpponentsContext.Provider value={{ filters, setFilters }}>
      <MatchOpponentsView data={data} loading={loading} error={error} seasonReady={seasonReady} />
    </MatchOpponentsContext.Provider>
  );
}
