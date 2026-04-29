import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledSelectInput, SectionContainer } from '../../../../components';
import { T_FETCH_RESULTS } from '../../graphql';

export interface FilterForm {
  selectedTeam: string;
}

interface Props {
  results: T_FETCH_RESULTS['results'];
  control: Control<FilterForm>;
}

export default function ResultsFilter({ results, control }: Props) {
  const { t } = useTranslation('results');

  const teamsInResults = results.flatMap(result =>
    [result.homeTeam, result.awayTeam].map(team => ({ id: team._id, name: team.teamName }))
  );

  const teamsSet = new Set<string>();
  teamsInResults.forEach(team => teamsSet.add(team.id));
  const uniqueTeams = Array.from(teamsSet).map(id => teamsInResults.find(t => t.id === id)!);

  const teamOptions = [
    { value: 'all', label: t('FILTERS.ALL_TEAMS') },
    ...uniqueTeams
      .map(team => ({ value: team.id, label: team.name }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  ];

  return (
    <SectionContainer>
      <ControlledSelectInput
        name="selectedTeam"
        label={t('FILTERS.TEAMS')}
        options={teamOptions}
        control={control}
      />
    </SectionContainer>
  );
}
