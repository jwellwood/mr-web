import { useQuery } from '@apollo/client';
import { useCustomParams } from '../../../hooks';
import { useSeasons } from '../../../hooks/useSeasons';
import SquadView from '../components/squad-overview/SquadView';
import { FETCH_SQUAD_LIST_BY_SEASON } from '../graphql';

export default function Squad() {
  const { teamId } = useCustomParams();
  const { seasonId, loading, seasonReady } = useSeasons();

  const {
    loading: statsLoading,
    error,
    data,
  } = useQuery(FETCH_SQUAD_LIST_BY_SEASON, {
    variables: { teamId: teamId!, seasonId: seasonId! },
    skip: !seasonReady,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  return <SquadView data={data} loading={loading || statsLoading} error={error} />;
}
