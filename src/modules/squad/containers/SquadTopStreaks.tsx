import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import SquadTopStreaksView from '../components/squad-records/squad-top-streaks/SquadTopStreaksView';
import { FETCH_TOP_PLAYER_STREAKS } from '../graphql';

interface Props {
  streakType: string;
}

export default function SquadTopStreaks({ streakType }: Props) {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_TOP_PLAYER_STREAKS, {
    variables: { teamId: teamId!, sortBy: streakType! },
  });

  return (
    <SquadTopStreaksView data={data} loading={loading} error={error} streakType={streakType} />
  );
}
