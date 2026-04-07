import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks';
import { FETCH_ORG_SEASON } from '../graphql';
import SeasonAdminPage from '../pages/SeasonAdminPage';

export default function SeasonAdmin() {
  const { orgSeasonId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_ORG_SEASON, {
    variables: { seasonId: orgSeasonId! },
  });

  return <SeasonAdminPage data={data} loading={loading} error={error} />;
}
