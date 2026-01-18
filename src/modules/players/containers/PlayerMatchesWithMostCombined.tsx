import { useQuery } from '@apollo/client';

import { FETCH_PLAYER_MATCHES_WITH_RECORD_COMBINED } from '../graphql';
import { useCustomParams } from '../../../hooks';
import PlayerRecordsMatchesView from '../views/PlayerRecordsMatchesView';

interface Props {
  record: number;
}

export default function PlayerMatchesWithMostCombined({ record }: Props) {
  const { teamId, playerId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_PLAYER_MATCHES_WITH_RECORD_COMBINED, {
    variables: { teamId, playerId, record },
    skip: !record,
  });

  return (
    <PlayerRecordsMatchesView data={data?.stats} loading={loading} title="Combined" error={error} />
  );
}
