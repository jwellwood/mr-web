import { Fragment } from 'react';
import { T_FETCH_FIXTURES, T_FETCH_RESULTS } from '../../graphql';
import { getResultsByGameWeek } from '../../helpers/getResultsByGameweek';
import AccordionSection from './AccordionSection';

interface Props {
  results: T_FETCH_RESULTS['results'] | T_FETCH_FIXTURES['fixtures'];
  isFixture?: boolean;
}

export default function ResultsAccordion({ results, isFixture }: Props) {
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

        let expandedGameWeek: string | null = null;
        if (isFixture) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          let closestDate: Date | null = null;
          Object.entries(resultsByGameWeek).forEach(([gw, gwRes]) => {
            gwRes.forEach(r => {
              const d = r?.date ? new Date(r.date) : null;
              if (d && d >= today && (!closestDate || d < closestDate)) {
                closestDate = d;
                expandedGameWeek = gw;
              }
            });
          });
        }

        const gameWeekEntries = Object.entries(resultsByGameWeek).reverse();

        return (
          <Fragment key={competitionName}>
            {gameWeekEntries.map(([gameWeek, gwResults], gwIndex) => (
              <AccordionSection
                key={`${competitionName}-${gameWeek}`}
                competitionName={competitionName}
                gameWeek={gameWeek}
                gwResults={gwResults}
                isExpanded={isFixture ? gameWeek === expandedGameWeek : gwIndex === 0}
                isFixture={isFixture}
              />
            ))}
          </Fragment>
        );
      })}
    </>
  );
}
