import { useTranslation } from 'react-i18next';
import { FilterBox } from '../../../../../components/filters';
import { useMatchOpponentFilters } from '../../../context';

export default function OpponentFiltersDisplay() {
  const { t } = useTranslation('matches');
  const { filters } = useMatchOpponentFilters();
  const { showAllTeams, includeForfeits } = filters;

  const filterData = [
    {
      label: showAllTeams ? t('FILTERS.ALL_TEAMS') : t('FILTERS.ACTIVE_TEAMS'),
      applied: showAllTeams,
    },
    {
      label: includeForfeits ? t('FILTERS.INCLUDE_FORFEITS') : t('FILTERS.EXCLUDE_FORFEITS'),
      applied: !includeForfeits,
    },
  ];

  return <FilterBox filterData={filterData} applied={showAllTeams || !includeForfeits} />;
}
