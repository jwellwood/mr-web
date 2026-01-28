import { ApolloError } from '@apollo/client';
import { useCustomParams } from '../../../../../hooks';
import PlayerRecordsMatchesModal from './PlayerRecordsMatchesModal';
import { T_PLAYER_MATCH_WITH_RECORD } from '../../../types';

interface Props {
  data?: T_PLAYER_MATCH_WITH_RECORD;
  loading: boolean;
  error?: ApolloError;
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
