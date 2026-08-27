import { useTranslation } from 'react-i18next';
import { ISelectOptions } from '../../../components';
import { FilterBox } from '../../../components/filters';
import { useGoalscorersFilters } from '../hooks';

interface Props {
  competitionOptions: ISelectOptions[];
  teamOptions: ISelectOptions[];
}

export default function GoalscorersFiltersDisplay({ competitionOptions, teamOptions }: Props) {
  const { t } = useTranslation('goalscorers');
  const { filters } = useGoalscorersFilters();
  const { competitionId, teamId } = filters;

  const selectedComp = competitionOptions.find(comp => comp.value === competitionId);
  const selectedTeam = teamOptions.find(team => team.value === teamId);

  const filterData = [
    {
      label:
        competitionId === 'all'
          ? t('FILTERS.ALL_COMPETITIONS')
          : selectedComp?.label?.toString() || '',
      applied: competitionId !== 'all',
    },
    {
      label: teamId === 'all' ? t('FILTERS.ALL_TEAMS') : selectedTeam?.label?.toString() || '',
      applied: teamId !== 'all',
    },
  ];

  return (
    <FilterBox filterData={filterData} applied={competitionId !== 'all' || teamId !== 'all'} />
  );
}
