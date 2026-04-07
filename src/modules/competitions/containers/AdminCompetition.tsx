import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { FETCH_COMPETITION } from '../graphql';
import CompetitonPage from '../pages/CompetitionPage';

export default function AdminCompetition() {
  const { competitionId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_COMPETITION, {
    variables: { compId: competitionId! },
  });

  return <CompetitonPage data={data} loading={loading} error={error} />;
}
