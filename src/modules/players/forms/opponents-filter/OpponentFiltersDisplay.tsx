import { FilterBox } from '../../../../components/filters';
import { usePlayerOpponentFilters } from '../../context';

export default function OpponentFiltersDisplay() {
  const { filters } = usePlayerOpponentFilters();
  const { showAllOpponents, showAverages } = filters;

  const filterData = [
    { label: showAllOpponents ? 'All Teams' : 'Active Teams', applied: showAllOpponents },
    { label: showAverages ? 'Averages' : 'Basic Stats', applied: showAverages },
  ];

  return <FilterBox filterData={filterData} applied={showAllOpponents || showAverages} />;
}
