import { useQuery } from '@apollo/client';

import { FETCH_HALL_OF_FAME } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import HallOfFameView from '../components/hall-of-fame/HallOfFameView';

export default function HallOfFame() {
  const { teamId } = useCustomParams();

  const { loading, data, error } = useQuery(FETCH_HALL_OF_FAME, {
    variables: { teamId: teamId! },
  });

  return <HallOfFameView data={data} loading={loading} error={error} />;
}
