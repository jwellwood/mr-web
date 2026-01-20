import { ApolloError } from '@apollo/client';

import PlayerRecordsMatchesModal from '../../squad/components/PlayerRecordsMatchesModal';
import { useCustomParams } from '../../../hooks';
import { IPlayerRecordMatch } from '../../squad/types';

interface Props {
  data?: IPlayerRecordMatch[];
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
