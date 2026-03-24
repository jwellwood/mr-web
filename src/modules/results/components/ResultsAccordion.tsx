import { Fragment } from 'react';
import { T_FETCH_FIXTURES, T_FETCH_RESULTS } from '../graphql';
import { getResultsByGameWeek } from '../helpers/getResultsByGameweek';
import AccordionSection from './AccordionSection';

interface Props {
  results: T_FETCH_RESULTS['results'] | T_FETCH_FIXTURES['fixtures'];
}

export default function ResultsAccordion({ results }: Props) {
  // Group results by competition first so we render one accordion per competition
  const competitions = results.reduce<
    Record<string, (T_FETCH_RESULTS['results'][number] | T_FETCH_FIXTURES['fixtures'][number])[]>
  >((acc, r) => {
    const name = r?.competitionId?.name || 'Other';
    if (!acc[name]) acc[name] = [];
    acc[name].push(r);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(competitions).map(([competitionName, compResults]) => {
        const resultsByGameWeek = getResultsByGameWeek(compResults);

        return (
          <Fragment key={competitionName}>
            {Object.entries(resultsByGameWeek)
              .reverse()
              .map(([gameWeek, gwResults], gwIndex) => (
                <AccordionSection
                  key={`${competitionName}-${gameWeek}`}
                  competitionName={competitionName}
                  gameWeek={gameWeek}
                  gwResults={gwResults}
                  gwIndex={gwIndex}
                />
              ))}
          </Fragment>
        );
      })}
    </>
  );
}
