import { useTeamOptions } from '../../../hooks';
import useCompetitionConfig from '../../results/hooks/useCompetitionConfig';
import { TGoalscorersFilters } from '../context';
import { useGoalscorersFilters } from '../hooks';
import GoalscorersFiltersForm from './GoalscorersFiltersForm';

interface Props {
  competitionId: string;
}

export default function GoalscorersFilters({ competitionId }: Props) {
  const DEFAULT_FILTERS: TGoalscorersFilters = { competitionId, teamId: 'all' };
  const { competitionConfig } = useCompetitionConfig();

  const competitionOptions =
    competitionConfig?.map(config => ({ label: config.name, value: config.id })) || [];
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
