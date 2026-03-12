import PlayerRecordsMatchesModal from '../components/player-records/PlayerRecordsMatchesModal';
import { FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS } from '../graphql';

interface Props {
  record: number;
}

export default function PlayerMatchesWithMostGoals({ record }: Props) {
  return (
    <PlayerRecordsMatchesModal
      record={record}
      title="Goals"
      query={FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS}
    />
  );
}
