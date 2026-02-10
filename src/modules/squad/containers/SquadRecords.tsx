import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import SquadOverallRecordsView from '../components/squad-records/squad-overall-records/SquadOverallRecordsView';
import { FETCH_SQUAD_RECORDS } from '../graphql';

export default function SquadRecords() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SQUAD_RECORDS, {
    variables: { teamId: teamId! },
  });

  return <SquadOverallRecordsView data={data} loading={loading} error={error} />;
}
