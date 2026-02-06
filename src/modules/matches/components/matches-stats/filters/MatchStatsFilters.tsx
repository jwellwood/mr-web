import { useStatsFilters } from '../../../../../hooks';
import { TMatchStatsFilters, useMatchStatsFilters } from '../../../context';
import MatchStatsFiltersForm from './MatchStatsFiltersForm';

export default function MatchStatsFilters() {
  const { competitionOptions } = useStatsFilters();
  const { setFilters } = useMatchStatsFilters();

  const onSubmit = (values: TMatchStatsFilters) => setFilters(values);

  const onReset = () => setFilters({ competition: 'all', includeForfeits: true });

  return (
    <MatchStatsFiltersForm
      onSubmit={onSubmit}
      onReset={onReset}
      defaultValues={{
        competition: 'all',
        includeForfeits: true,
      }}
      competitionOptions={competitionOptions}
    />
  );
}
