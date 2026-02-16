import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks';
import PlayerRecordsMatchesView from '../components/player-records/PlayerRecordsMatchesView';
import { FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS } from '../graphql';

interface Props {
  record: number;
}

export default function PlayerMatchesWithMostGoals({ record }: Props) {
  const { teamId, playerId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS, {
    variables: { teamId: teamId!, playerId: playerId!, record },
    skip: !record,
  });

  return <PlayerRecordsMatchesView data={data} loading={loading} title="Goals" error={error} />;
}
