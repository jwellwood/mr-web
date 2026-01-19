import { useQuery } from '@apollo/client';

import { FETCH_SQUAD_SINGLE_SEASON_RECORDS } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import SingleSeasonRecordsView from '../views/SquadSingleSeasonRecordsView';

export default function SquadSingleSeasonRecords() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SQUAD_SINGLE_SEASON_RECORDS, {
    variables: { teamId },
  });

  return <SingleSeasonRecordsView data={data} loading={loading} error={error} />;
}
