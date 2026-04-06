import { useTranslation } from 'react-i18next';
import type { ISelectOptions } from '../../../components';
import { FilterBox } from '../../../components/filters';
import { useSquadStatsFilters } from '../context/useSquadStatsFilters';

interface Props {
  competitionOptions: ISelectOptions[];
  seasonOptions: ISelectOptions[];
}

export default function StatsFiltersDisplay({ seasonOptions, competitionOptions }: Props) {
  const { t } = useTranslation('squad');
  const { filters } = useSquadStatsFilters();
  const { seasons, competitions } = filters;
  const selectedComp = competitionOptions.find(comp => comp.value === competitions);
  const selectedSeason = seasonOptions.find(season => season.value === seasons);

  const filterData = [
    {
      label:
        selectedSeason?.value === 'all'
          ? t('FILTERS.ALL_SEASONS')
          : selectedSeason?.label?.toString() || '',
      applied: selectedSeason?.value !== 'all',
    },
    {
      label:
        selectedComp?.value === 'all'
          ? t('FILTERS.ALL_COMPETITIONS')
          : selectedComp?.label?.toString() || '',
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
