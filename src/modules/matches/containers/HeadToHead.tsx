import { useQuery } from '@apollo/client';
import { useCustomParams } from '../../../hooks/useCustomParams';
import HeadToHeadView from '../components/match/HeadToHeadView';
import { FETCH_MATCHES_BY_OPPONENT } from '../graphql';

interface Props {
  opponentId?: string;
}

export default function HeadToHead({ opponentId }: Props) {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_MATCHES_BY_OPPONENT, {
    variables: { teamId: teamId!, opponentId: opponentId! },
  });

  return <HeadToHeadView data={data} loading={loading} error={error} />;
}
