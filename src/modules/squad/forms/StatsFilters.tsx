import { useStatsFilters } from '../../../hooks';
import { TFilters } from '../context/SquadStatsFiltersContext';
import { useSquadStatsFilters } from '../context/useSquadStatsFilters';
import StatsFiltersForm from './StatsFiltersForm';

export default function StatsFilters() {
  const { seasonOptions, competitionOptions } = useStatsFilters();
  const { setFilters } = useSquadStatsFilters();

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
