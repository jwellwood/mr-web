import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { FETCH_ORG_SEASON } from '../graphql';
import OrgSeasonPage from '../pages/OrgSeasonPage';

export default function OrgSeason() {
  const { orgSeasonId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_ORG_SEASON, {
    variables: { seasonId: orgSeasonId! },
  });

  return <OrgSeasonPage data={data} loading={loading} error={error} />;
}
