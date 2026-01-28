import { useQuery } from '@apollo/client';

import { useCustomParams } from '../../../hooks/useCustomParams';
import { FETCH_TROPHIES } from '../graphql';
import TrophiesView from '../components/trophies/TrophiesView';

export default function Trophies() {
  const { teamId } = useCustomParams();

  const { error, loading, data } = useQuery(FETCH_TROPHIES, {
    variables: { teamId: teamId! },
  });

  return <TrophiesView data={data} loading={loading} error={error} />;
}
