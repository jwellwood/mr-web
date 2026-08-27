import { useStatsFilters, useTeamOptions } from '../../../hooks';
import { TGoalscorersFilters } from '../context';
import { useGoalscorersFilters } from '../hooks';
import GoalscorersFiltersForm from './GoalscorersFiltersForm';

const DEFAULT_FILTERS: TGoalscorersFilters = { competitionId: 'all', teamId: 'all' };

export default function GoalscorersFilters() {
  const { competitionOptions } = useStatsFilters();
  const { teamOptions } = useTeamOptions();

  const { setFilters } = useGoalscorersFilters();

  const onSubmit = (values: TGoalscorersFilters) => setFilters(values);

  const onReset = () => setFilters(DEFAULT_FILTERS);

  return (
    <GoalscorersFiltersForm
      onSubmit={onSubmit}
      onReset={onReset}
      defaultValues={DEFAULT_FILTERS}
      competitionOptions={competitionOptions}
      teamOptions={teamOptions}
    />
  );
}
