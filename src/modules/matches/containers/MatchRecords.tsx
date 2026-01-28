import { useQuery } from '@apollo/client';

import { FETCH_MATCHES_RECORDS } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import MatchRecordsView from '../components/matches-records/MatchRecordsView';

export default function MatchRecords() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_MATCHES_RECORDS, {
    variables: { teamId: teamId! },
  });

  return <MatchRecordsView data={data} loading={loading} error={error} />;
}
