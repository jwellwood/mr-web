import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import MatchesStreaksView from '../components/matches-records/MatchesStreaksView';
import { FETCH_MATCHES_STREAK } from '../graphql';

export default function MatchRecords() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_MATCHES_STREAK, {
    variables: { teamId: teamId! },
  });

  return <MatchesStreaksView data={data} loading={loading} error={error} />;
}
