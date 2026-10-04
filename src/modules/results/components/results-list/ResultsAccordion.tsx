import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { NoDataText } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { T_FETCH_RESULTS } from '../../graphql';
import { getExpandedGameweeks } from '../../helpers/getExpandedGameweeks';
import { getResultsByGameWeek } from '../../helpers/getResultsByGameweek';
import AccordionSection from './AccordionSection';
import ResultsFilter, { FilterForm } from './ResultsFilter';
import TeamResults from './TeamResults';

interface Props {
  results: T_FETCH_RESULTS['results'];
  isAdminView?: boolean;
  loading?: boolean;
  isCurrentSeason?: boolean;
}

export default function ResultsAccordion({
  results,
  isAdminView,
  loading,
  isCurrentSeason = true,
}: Props) {
  const { t } = useTranslation('results');
  const [searchParams, setSearchParams] = useSearchParams();
  const { control } = useForm<FilterForm>({
    defaultValues: { selectedTeam: searchParams.get('teamId') || 'all' },
  });
  const selectedTeam = useWatch({ control, name: 'selectedTeam' });

  useEffect(() => {
    const currentTeamId = searchParams.get('teamId');
    if (selectedTeam === 'all' ? !currentTeamId : currentTeamId === selectedTeam) return;

    const nextSearchParams = new URLSearchParams(searchParams);
    if (selectedTeam === 'all') {
      nextSearchParams.delete('teamId');
    } else {
      nextSearchParams.set('teamId', selectedTeam);
    }
    setSearchParams(nextSearchParams, { replace: true });
  }, [searchParams, selectedTeam, setSearchParams]);

  const filteredResults =
    selectedTeam === 'all'
      ? results
      : results.filter(r => r.homeTeam?._id === selectedTeam || r.awayTeam?._id === selectedTeam);

  const resultsByGameWeek = getResultsByGameWeek(filteredResults);
  const expandedGameWeek = getExpandedGameweeks(resultsByGameWeek);

  const sortDirection = isCurrentSeason ? 1 : -1;
  const gameWeekEntries = Object.entries(resultsByGameWeek).sort(([first], [second]) => {
    const firstRound = Number(first);
    const secondRound = Number(second);
    const difference =
      Number.isFinite(firstRound) && Number.isFinite(secondRound)
        ? firstRound - secondRound
        : first.localeCompare(second);
    return difference * sortDirection;
  });
  const defaultExpanded = expandedGameWeek ?? gameWeekEntries[0]?.[0] ?? null;

  if (!results.length && !loading) {
    return <NoDataText>{t('NO_DATA.RESULTS')}</NoDataText>;
  }

  return loading ? (
    <Spinner />
  ) : (
    <>
      <ResultsFilter results={results} control={control} />

      {gameWeekEntries.map(([gameWeek, gwResults]) =>
        selectedTeam === 'all' ? (
          <AccordionSection
            key={gameWeek}
            gameWeek={gameWeek}
            gwResults={gwResults}
            isExpanded={gameWeek === defaultExpanded}
            isAdminView={isAdminView}
          />
        ) : (
          <TeamResults key={gameWeek} results={gwResults} selectedTeam={selectedTeam} />
        )
      )}
    </>
  );
}
