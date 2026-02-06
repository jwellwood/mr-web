import { FilterBox } from '../../../../../components/filters';
import { useMatchOpponentFilters } from '../../../context';

export default function OpponentFiltersDisplay() {
  const { filters } = useMatchOpponentFilters();
  const { showAllTeams, includeForfeits } = filters;

  const filterData = [
    { label: showAllTeams ? 'All Teams' : 'Active Teams', applied: showAllTeams },
    { label: includeForfeits ? 'Include Forfeits' : 'Exclude Forfeits', applied: !includeForfeits },
  ];

  return <FilterBox filterData={filterData} applied={showAllTeams || !includeForfeits} />;
}
