import PlayerRecordsMatchesModal from '../components/player-records/PlayerRecordsMatchesModal';
import { FETCH_PLAYER_MATCHES_WITH_RECORD_COMBINED } from '../graphql';

interface Props {
  record: number;
}

export default function PlayerMatchesWithMostCombined({ record }: Props) {
  return (
    <PlayerRecordsMatchesModal
      record={record}
      title="Combined"
      query={FETCH_PLAYER_MATCHES_WITH_RECORD_COMBINED}
    />
  );
}
