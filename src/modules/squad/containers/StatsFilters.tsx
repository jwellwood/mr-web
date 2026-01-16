import { useStatsFilters } from '../hooks/useStatsFilters';
import { TFilters } from '../context/FiltersContext';
import { useFilters } from '../context/useFilters';
import StatsFiltersForm from '../components/StatsFiltersForm';

export default function StatsFilters() {
  const { seasonOptions, competitionOptions } = useStatsFilters();
  const { setFilters } = useFilters();

  const onSubmit = (values: TFilters) => setFilters(values);
  const onReset = () => setFilters({ seasons: 'all', competitions: 'all', showAverages: false });
  return (
    <>
      <StatsFiltersForm
        onSubmit={onSubmit}
        onReset={onReset}
        defaultValues={{
          seasons: 'all',
          competitions: 'all',
          showAverages: false,
        }}
        seasonOptions={seasonOptions || []}
        competitionOptions={competitionOptions || []}
      />
    </>
  );
}
