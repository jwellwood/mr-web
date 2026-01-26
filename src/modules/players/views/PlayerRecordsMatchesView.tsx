import { ApolloError } from '@apollo/client';

import PlayerRecordsMatchesModal from '../../squad/components/PlayerRecordsMatchesModal';
import { useCustomParams } from '../../../hooks';
import {
  FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH_QUERY,
  FETCH_SQUAD_RECORD_GOALS_IN_MATCH_QUERY,
} from '../../squad/types';

type MostInMatchItem =
  | FETCH_SQUAD_RECORD_GOALS_IN_MATCH_QUERY['stats'][number]
  | FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH_QUERY['stats'][number];

interface Props {
  data?: MostInMatchItem[];
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
