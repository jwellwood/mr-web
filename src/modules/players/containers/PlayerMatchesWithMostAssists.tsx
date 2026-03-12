import PlayerRecordsMatchesModal from '../components/player-records/PlayerRecordsMatchesModal';
import { FETCH_PLAYER_MATCHES_WITH_RECORD_ASSISTS } from '../graphql';

interface Props {
  record: number;
}

export default function PlayerMatchesWithMostAssists({ record }: Props) {
  return (
    <PlayerRecordsMatchesModal
      record={record}
      title="Assists"
      query={FETCH_PLAYER_MATCHES_WITH_RECORD_ASSISTS}
    />
  );
}
