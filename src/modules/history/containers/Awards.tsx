import { useQuery } from '@apollo/client';

import { FETCH_AWARDS } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import AwardsView from '../views/AwardsView';

export default function Awards() {
  const { seasonId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_AWARDS, {
    variables: { seasonId },
  });

  return <AwardsView data={data} loading={loading} error={error} />;
}
