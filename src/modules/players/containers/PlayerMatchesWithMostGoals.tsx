import { useTranslation } from 'react-i18next';
import PlayerRecordsMatchesModal from '../components/player-records/PlayerRecordsMatchesModal';
import { FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS } from '../graphql';

interface Props {
  record: number;
}

export default function PlayerMatchesWithMostGoals({ record }: Props) {
  const { t } = useTranslation('players');
  return (
    <PlayerRecordsMatchesModal
      record={record}
      title={t('SECTIONS.GOALS')}
      query={FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS}
    />
  );
}
