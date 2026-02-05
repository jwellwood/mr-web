import { useStatsFilters } from '../../../../hooks';
import { TFilters, usePlayerStatsFilters } from '../../context';
import StatsFiltersForm from './StatsFiltersForm';

export default function StatsFilters() {
  const { seasonOptions, competitionOptions } = useStatsFilters();
  const { setFilters } = usePlayerStatsFilters();

  const onSubmit = (values: TFilters) => setFilters(values);

  const onReset = () => setFilters({ seasons: 'all', competitions: 'all' });
  return (
    <>
      <StatsFiltersForm
        onSubmit={onSubmit}
        onReset={onReset}
        defaultValues={{
          seasons: 'all',
          competitions: 'all',
        }}
        seasonOptions={seasonOptions || []}
        competitionOptions={competitionOptions || []}
      />
    </>
  );
}
