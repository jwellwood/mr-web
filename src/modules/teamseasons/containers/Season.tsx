import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { FETCH_SEASON } from '../graphql';
import SeasonPage from '../pages/SeasonPage';

export default function Season() {
  const { seasonId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_SEASON, {
    variables: { seasonId: seasonId! },
  });

  return <SeasonPage data={data} loading={loading} error={error} />;
}
