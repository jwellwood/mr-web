import { useQuery } from '@apollo/client';

import { FETCH_SQUAD_LIST_BY_SEASON } from '../graphql';
import { AUTH_ROLES } from '../../../constants';
import { useCustomParams } from '../../../hooks';
import { useSeasons } from '../../../hooks/useSeasons';
import RouteGuard from '../../../router/RouteGuard';
import SquadView from '../views/SquadView';

export default function Squad() {
  const { teamId } = useCustomParams();
  const { seasonId, loading } = useSeasons();

  const {
    loading: statsLoading,
    error,
    data,
  } = useQuery(FETCH_SQUAD_LIST_BY_SEASON, {
    variables: { teamId, seasonId },
    skip: !seasonId,
  });

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <SquadView data={data} loading={loading || statsLoading} error={error} />
    </RouteGuard>
  );
}
