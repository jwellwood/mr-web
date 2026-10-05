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
  const pageSize = 20;
  const [filters, setFilters] = useState<TGoalscorersFilters>({
    competitionId: competitionId,
    teamId: 'all',
  });
  const [page, setPage] = useState(1);

  const handleFiltersChange: typeof setFilters = value => {
    setFilters(value);
    setPage(1);
  };

  const { data, error, loading } = useQuery(FETCH_GOALSCORER_LEADERBOARD, {
    variables: {
      orgId: orgId!,
      orgSeasonId: orgSeasonId || 'default',
      competitionId: filters.competitionId,
      teamId: filters.teamId,
      page,
      limit: pageSize,
    },
  });

  return (
    <GoalscorersContext.Provider value={{ filters, setFilters: handleFiltersChange }}>
      <SectionContainer title={<GoalscorersFilters competitionId={competitionId} />}>
        <GoalScorersTable
          data={data?.data}
          loading={loading}
          error={error}
          page={page}
          pageSize={pageSize}
          totalPages={data?.data.totalPages ?? 1}
          onPageChange={setPage}
        />
      </SectionContainer>
    </GoalscorersContext.Provider>
  );
}
