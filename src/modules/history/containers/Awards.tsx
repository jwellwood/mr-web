import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import AwardsView from '../components/awards/AwardsView';
import { FETCH_AWARDS } from '../graphql';

interface Props {
  season_id?: string;
}

export default function Awards({ season_id }: Props) {
  const { seasonId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_AWARDS, {
    variables: { seasonId: season_id! || seasonId! },
  });

  return <AwardsView data={data} loading={loading} error={error} seasonId={season_id} />;
}
