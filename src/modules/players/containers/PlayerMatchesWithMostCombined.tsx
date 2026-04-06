import { useTranslation } from 'react-i18next';
import PlayerRecordsMatchesModal from '../components/player-records/PlayerRecordsMatchesModal';
import { FETCH_PLAYER_MATCHES_WITH_RECORD_COMBINED } from '../graphql';

interface Props {
  record: number;
}

export default function PlayerMatchesWithMostCombined({ record }: Props) {
  const { t } = useTranslation('players');
  return (
    <PlayerRecordsMatchesModal
      record={record}
      title={t('SECTIONS.COMBINED')}
      query={FETCH_PLAYER_MATCHES_WITH_RECORD_COMBINED}
    />
  );
}
