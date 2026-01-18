import { useStatsFilters } from '../../../hooks';
import { TFilters, useFilters } from '../context';
import StatsFiltersForm from './components/StatsFiltersForm';

export default function StatsFilters() {
  const { seasonOptions, competitionOptions } = useStatsFilters();
  const { setFilters } = useFilters();

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
