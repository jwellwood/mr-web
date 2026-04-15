import { useStatsFilters } from '../../../../hooks';
import { TGoalscorersFilters, useGoalscorersFilters } from '../../context';
import GoalscorersFiltersForm from './filters/GoalscorersFiltersForm';

const DEFAULT_FILTERS: TGoalscorersFilters = { competitionId: 'all' };

export default function GoalscorersFilters() {
  const { competitionOptions } = useStatsFilters();
  const { setFilters } = useGoalscorersFilters();

  const onSubmit = (values: TGoalscorersFilters) => setFilters(values);

  const onReset = () => setFilters(DEFAULT_FILTERS);

  return (
    <GoalscorersFiltersForm
      onSubmit={onSubmit}
      onReset={onReset}
      defaultValues={DEFAULT_FILTERS}
      competitionOptions={competitionOptions}
    />
  );
}
