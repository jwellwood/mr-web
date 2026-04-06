import { useTranslation } from 'react-i18next';
import { FilterBox } from '../../../../components/filters';
import { usePlayerOpponentFilters } from '../../context';

export default function OpponentFiltersDisplay() {
  const { t } = useTranslation('players');
  const { filters } = usePlayerOpponentFilters();
  const { showAllOpponents, showAverages } = filters;

  const filterData = [
    {
      label: showAllOpponents ? t('FILTERS.SHOW_ALL_TEAMS') : t('FILTERS.SHOW_ACTIVE_TEAMS'),
      applied: showAllOpponents,
    },
    {
      label: showAverages ? t('FILTERS.SHOW_AVERAGES') : t('FILTERS.SHOW_BASIC_STATS'),
      applied: showAverages,
    },
  ];

  return <FilterBox filterData={filterData} applied={showAllOpponents || showAverages} />;
}
