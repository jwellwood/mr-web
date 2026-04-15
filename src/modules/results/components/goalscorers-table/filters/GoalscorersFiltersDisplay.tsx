import { useTranslation } from 'react-i18next';
import { ISelectOptions } from '../../../../../components';
import { FilterBox } from '../../../../../components/filters';
import { useGoalscorersFilters } from '../../../context';

interface Props {
  competitionOptions: ISelectOptions[];
}

export default function GoalscorersFiltersDisplay({ competitionOptions }: Props) {
  const { t } = useTranslation('results');
  const { filters } = useGoalscorersFilters();
  const { competitionId } = filters;

  const selectedComp = competitionOptions.find(comp => comp.value === competitionId);

  const filterData = [
    {
      label:
        competitionId === 'all'
          ? t('FILTERS.ALL_COMPETITIONS')
          : selectedComp?.label?.toString() || '',
      applied: competitionId !== 'all',
    },
  ];

  return <FilterBox filterData={filterData} applied={competitionId !== 'all'} />;
}
