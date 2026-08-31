import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { SectionContainer } from '../../../components';
import { useCustomParams } from '../../../hooks';
import GoalScorersTable from '../components/goalscorers-table/GoalscorersTable';
import { GoalscorersContext, TGoalscorersFilters } from '../context';
import GoalscorersFilters from '../filters/GoalscorersFilters';
import { FETCH_GOALSCORER_LEADERBOARD } from '../graphql';

interface Props {
  competitionId: string;
}

export default function Goalscorers({ competitionId }: Props) {
  const { orgId, orgSeasonId } = useCustomParams();
  const [filters, setFilters] = useState<TGoalscorersFilters>({
    competitionId: competitionId,
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
      <SectionContainer title={<GoalscorersFilters competitionId={competitionId} />}>
        <GoalScorersTable data={data?.data} loading={loading} error={error} />
      </SectionContainer>
    </GoalscorersContext.Provider>
  );
}
