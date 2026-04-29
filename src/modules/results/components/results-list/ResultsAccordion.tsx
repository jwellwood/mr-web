import { Fragment } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { T_FETCH_RESULTS } from '../../graphql';
import { getExpandedGameweeks } from '../../helpers/getExpandedGameweeks';
import { getResultsByGameWeek } from '../../helpers/getResultsByGameweek';
import AccordionSection from './AccordionSection';
import ResultsFilter, { FilterForm } from './ResultsFilter';

interface Props {
  results: T_FETCH_RESULTS['results'];
}

export default function ResultsAccordion({ results }: Props) {
  const { control } = useForm<FilterForm>({ defaultValues: { selectedTeam: 'all' } });
  const selectedTeam = useWatch({ control, name: 'selectedTeam' });

  const filteredResults =
    selectedTeam === 'all'
      ? results
      : results.filter(r => r.homeTeam._id === selectedTeam || r.awayTeam._id === selectedTeam);

  const competitions = filteredResults.reduce<Record<string, T_FETCH_RESULTS['results'][number][]>>(
    (acc, r) => {
      const name = r?.competitionId?.name || 'Other';
      if (!acc[name]) acc[name] = [];
      acc[name].push(r);
      return acc;
    },
    {}
  );

  return (
    <>
      <ResultsFilter results={results} control={control} />
      {Object.entries(competitions).map(([competitionName, compResults]) => {
        const resultsByGameWeek = getResultsByGameWeek(compResults);
        const expandedGameWeek = getExpandedGameweeks(resultsByGameWeek);
        const gameWeekEntries = Object.entries(resultsByGameWeek).reverse();
        const defaultExpanded = expandedGameWeek ?? gameWeekEntries[0]?.[0] ?? null;

        return (
          <Fragment key={competitionName}>
            {gameWeekEntries.map(([gameWeek, gwResults]) => (
              <AccordionSection
                key={`${competitionName}-${gameWeek}`}
                competitionName={competitionName}
                gameWeek={gameWeek}
                gwResults={gwResults}
                isExpanded={gameWeek === defaultExpanded}
              />
            ))}
          </Fragment>
        );
      })}
    </>
  );
}
