import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import SingleSeasonRecordsView from '../components/squad-records/squad-single-season-records/SquadSingleSeasonRecordsView';
import { FETCH_SQUAD_SINGLE_SEASON_RECORDS } from '../graphql';

export default function SquadSingleSeasonRecords() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SQUAD_SINGLE_SEASON_RECORDS, {
    variables: { teamId: teamId! },
  });

  return <SingleSeasonRecordsView data={data} loading={loading} error={error} />;
}
