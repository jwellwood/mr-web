import { useQuery } from '@apollo/client';
import { useCustomParams } from '../../../hooks';
import PlayerMatchesWithRecordsView from '../components/player-records/player-match-records/PlayerMatchesWithRecordsView';
import { FETCH_PLAYER_MATCH_RECORDS } from '../graphql';

export default function PlayerMatchesRecords() {
  const { teamId, playerId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_PLAYER_MATCH_RECORDS, {
    variables: { teamId: teamId!, playerId: playerId! },
  });

  return <PlayerMatchesWithRecordsView data={data} loading={loading} error={error} />;
}
