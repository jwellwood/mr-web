import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useCustomParams } from '../../../hooks';
import GoalscorersFilters from '../components/goalscorers-table/GoalscorersFilters';
import GoalScorersTable from '../components/goalscorers-table/GoalscorersTable';
import { GoalscorersContext, TGoalscorersFilters } from '../context';
import { FETCH_GOALSCORER_LEADERBOARD } from '../graphql';

export default function Goalscorers() {
  const { orgId, orgSeasonId } = useCustomParams();
  const [filters, setFilters] = useState<TGoalscorersFilters>({ competitionId: 'all' });

  const { data, error, loading } = useQuery(FETCH_GOALSCORER_LEADERBOARD, {
    variables: {
      orgId: orgId!,
      orgSeasonId: orgSeasonId || 'default',
      competitionId: filters.competitionId,
    },
  });

  return (
    <GoalscorersContext.Provider value={{ filters, setFilters }}>
      <GoalscorersFilters />
      <GoalScorersTable data={data?.data} loading={loading} error={error} />
    </GoalscorersContext.Provider>
  );
}
