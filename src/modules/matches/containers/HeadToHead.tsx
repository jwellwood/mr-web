import { useQuery } from '@apollo/client';

import { FETCH_MATCHES_BY_OPPONENT } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import HeadToHeadView from '../views/HeadToHeadView.tsx';

type Props = {
  opponentId?: string;
};

export default function HeadToHead({ opponentId }: Props) {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_MATCHES_BY_OPPONENT, {
    variables: { teamId, opponentId },
  });

  return <HeadToHeadView data={data} loading={loading} error={error} />;
}
