import { useQuery } from '@apollo/client';

import { FETCH_PAST_PLAYERS } from '../graphql';
import { useCustomParams } from '../../../hooks';
import PastPlayersView from '../components/past-players/PastPlayersView';

export default function PastPlayers() {
  const { teamId } = useCustomParams();

  const { loading, data, error } = useQuery(FETCH_PAST_PLAYERS, {
    variables: { teamId: teamId! },
  });

  return <PastPlayersView error={error} loading={loading} data={data} />;
}
