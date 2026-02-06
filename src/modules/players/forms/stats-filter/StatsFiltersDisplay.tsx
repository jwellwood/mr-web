import { usePlayerStatsFilters } from '../../context';
import type { ISelectOptions } from '../../../../components';
import { FilterBox } from '../../../../components/filters';

interface Props {
  competitionOptions: ISelectOptions[];
  seasonOptions: ISelectOptions[];
}

export default function StatsFiltersDisplay({ seasonOptions, competitionOptions }: Props) {
  const { filters } = usePlayerStatsFilters();
  const { seasons, competitions } = filters;
  const selectedComp = competitionOptions.find(comp => comp.value === competitions);
  const selectedSeason = seasonOptions.find(season => season.value === seasons);

  const filterData = [
    {
      label:
        selectedSeason?.value === 'all' ? 'All seasons' : selectedSeason?.label?.toString() || '',
      applied: selectedSeason?.value !== 'all',
    },
    {
      label:
        selectedComp?.value === 'all' ? 'All competitions' : selectedComp?.label?.toString() || '',
      applied: selectedComp?.value !== 'all',
    },
  ];

  return (
    <FilterBox
      filterData={filterData}
      applied={selectedSeason?.value !== 'all' || selectedComp?.value !== 'all'}
    />
  );
}
