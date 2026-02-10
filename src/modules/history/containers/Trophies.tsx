import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import TrophiesView from '../components/trophies/TrophiesView';
import { FETCH_TROPHIES } from '../graphql';

export default function Trophies() {
  const { teamId } = useCustomParams();

  const { error, loading, data } = useQuery(FETCH_TROPHIES, {
    variables: { teamId: teamId! },
  });

  return <TrophiesView data={data} loading={loading} error={error} />;
}
