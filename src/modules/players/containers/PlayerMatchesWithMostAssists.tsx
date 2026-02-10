import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks';
import PlayerRecordsMatchesView from '../components/player-records/player-match-records/PlayerRecordsMatchesView';
import { FETCH_PLAYER_MATCHES_WITH_RECORD_ASSISTS } from '../graphql';

interface Props {
  record: number;
}

export default function PlayerMatchesWithMostAssists({ record }: Props) {
  const { teamId, playerId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_PLAYER_MATCHES_WITH_RECORD_ASSISTS, {
    variables: { teamId: teamId!, playerId: playerId!, record },
    skip: !record,
  });

  return <PlayerRecordsMatchesView data={data} loading={loading} title="Assists" error={error} />;
}
