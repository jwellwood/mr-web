import { useQuery } from '@apollo/client';

import { FETCH_SQUAD_RECORDS } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RecordsView from '../views/RecordsView';

export default function SquadRecords() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SQUAD_RECORDS, {
    variables: { teamId: teamId! },
  });

  return <RecordsView data={data} loading={loading} error={error} />;
}
