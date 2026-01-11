import { useQuery } from '@apollo/client';

import { FETCH_SEASONS_POSITION } from '../graphql';
import { useCustomParams } from '../../../hooks';
import SeasonsView from '../views/SeasonsView';

export default function Seasons() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SEASONS_POSITION, {
    variables: { teamId },
  });

  return <SeasonsView data={data} loading={loading} error={error} />;
}
