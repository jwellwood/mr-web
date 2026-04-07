import { useTranslation } from 'react-i18next';
import { ISelectOptions } from '../../../../../components';
import { FilterBox } from '../../../../../components/filters';
import { useMatchStatsFilters } from '../../../context';

interface Props {
  competitionOptions: ISelectOptions[];
}

export default function MatchStatsFiltersDisplay({ competitionOptions }: Props) {
  const { t } = useTranslation('matches');
  const { filters } = useMatchStatsFilters();
  const { competition, includeForfeits } = filters;

  const selectedComp = competitionOptions.find(comp => comp.value === competition);

  const filterData = [
    {
      label:
        competition === 'all'
          ? t('FILTERS.ALL_COMPETITIONS')
          : selectedComp?.label?.toString() || '',
      applied: competition !== 'all',
    },
    {
      label: includeForfeits ? t('FILTERS.INCLUDE_FORFEITS') : t('FILTERS.EXCLUDE_FORFEITS'),
      applied: !includeForfeits,
    },
  ];

  return <FilterBox filterData={filterData} applied={competition !== 'all' || !includeForfeits} />;
}
