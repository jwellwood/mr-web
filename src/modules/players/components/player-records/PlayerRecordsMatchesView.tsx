import { useCustomParams } from '../../../../hooks';
import { TApolloError } from '../../../../types/apollo';
import { T_PLAYER_MATCH_WITH_RECORD } from '../../types';
import PlayerRecordsMatchesModal from './PlayerRecordsMatchesModal';

interface Props {
  data?: T_PLAYER_MATCH_WITH_RECORD;
  loading: boolean;
  error?: TApolloError;
  title: string;
}

export default function PlayerRecordsMatchesView({ data, loading, error, title }: Props) {
  const { orgId, teamId } = useCustomParams();
  return (
    <PlayerRecordsMatchesModal
      data={data}
      loading={loading}
      orgId={orgId}
      teamId={teamId}
      title={title}
      error={error}
    />
  );
}
