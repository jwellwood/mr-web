import { useQuery } from '@apollo/client';

import { FETCH_AWARDS } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import AwardsView from '../views/AwardsView';

interface Props {
  season_id?: string;
}

export default function Awards({ season_id }: Props) {
  const { seasonId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_AWARDS, {
    variables: { seasonId: season_id || seasonId },
  });

  return <AwardsView data={data} loading={loading} error={error} seasonId={season_id} />;
}
