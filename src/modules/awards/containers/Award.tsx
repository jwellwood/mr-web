import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { FETCH_AWARD } from '../graphql';
import AwardPage from '../pages/AwardPage';

export default function Award() {
  const { awardId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_AWARD, {
    variables: { awardId: awardId! },
  });

  return <AwardPage data={data} loading={loading} error={error} />;
}
