import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { SectionContainer } from '../../../components';
import { useCustomParams } from '../../../hooks';
import GoalScorersTable from '../components/goalscorers-table/GoalscorersTable';
import { GoalscorersContext, TGoalscorersFilters } from '../context';
import GoalscorersFilters from '../filters/GoalscorersFilters';
import { FETCH_GOALSCORER_LEADERBOARD } from '../graphql';

export default function Goalscorers() {
  const { orgId, orgSeasonId } = useCustomParams();
  const [filters, setFilters] = useState<TGoalscorersFilters>({
    competitionId: 'all',
    teamId: 'all',
  });

  const { data, error, loading } = useQuery(FETCH_GOALSCORER_LEADERBOARD, {
    variables: {
      orgId: orgId!,
      orgSeasonId: orgSeasonId || 'default',
      competitionId: filters.competitionId,
      teamId: filters.teamId,
    },
  });

  return (
    <GoalscorersContext.Provider value={{ filters, setFilters }}>
      <SectionContainer title={<GoalscorersFilters />}>
        <GoalScorersTable data={data?.data} loading={loading} error={error} />
      </SectionContainer>
    </GoalscorersContext.Provider>
  );
}
