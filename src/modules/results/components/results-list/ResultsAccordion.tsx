import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
}

export default function ResultsAccordion({ results, isAdminView, loading }: Props) {
  const { t } = useTranslation('results');
  const { control } = useForm<FilterForm>({ defaultValues: { selectedTeam: 'all' } });
  const selectedTeam = useWatch({ control, name: 'selectedTeam' });

  const filteredResults =
    selectedTeam === 'all'
      ? results
      : results.filter(r => r.homeTeam?._id === selectedTeam || r.awayTeam?._id === selectedTeam);

  const resultsByGameWeek = getResultsByGameWeek(filteredResults);
  const expandedGameWeek = getExpandedGameweeks(resultsByGameWeek);
  const gameWeekEntries = Object.entries(resultsByGameWeek).reverse();
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
