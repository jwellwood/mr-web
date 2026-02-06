import { ISelectOptions } from '../../../../../components';
import { FilterBox } from '../../../../../components/filters';
import { useMatchStatsFilters } from '../../../context';

interface Props {
  competitionOptions: ISelectOptions[];
}

export default function MatchStatsFiltersDisplay({ competitionOptions }: Props) {
  const { filters } = useMatchStatsFilters();
  const { competition, includeForfeits } = filters;

  const selectedComp = competitionOptions.find(comp => comp.value === competition);

  const filterData = [
    {
      label: competition === 'all' ? 'All Competitions' : selectedComp?.label?.toString() || '',
      applied: competition !== 'all',
    },
    { label: includeForfeits ? 'Include Forfeits' : 'Exclude Forfeits', applied: !includeForfeits },
  ];

  return <FilterBox filterData={filterData} applied={competition !== 'all' || !includeForfeits} />;
}
