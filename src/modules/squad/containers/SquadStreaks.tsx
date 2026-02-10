import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import SquadStreakRecordsView from '../components/squad-records/squad-streak-records/SquadStreakRecordsView';
import { FETCH_SQUAD_STREAKS } from '../graphql';

export default function SquadStreaksRecords() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SQUAD_STREAKS, {
    variables: { teamId: teamId! },
  });

  return <SquadStreakRecordsView data={data} loading={loading} error={error} />;
}
