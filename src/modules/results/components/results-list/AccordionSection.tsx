import { useEffect, useRef } from 'react';
import { CustomTypography, SectionContainer } from '../../../../components';
import { CustomAccordion } from '../../../../components/accordion';
import { parseDate } from '../../../../utils';
import { T_FETCH_RESULTS } from '../../graphql';
import AccordionTitle from './AccordionTitle';
import ByeGames from './ByeGames';
import ResultTable from './ResultTable';

interface Props {
  gameWeek: string;
  gwResults: T_FETCH_RESULTS['results'];
  isExpanded: boolean;
  isAdminView?: boolean;
}

export default function AccordionSection({ gameWeek, gwResults, isExpanded, isAdminView }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [byeGames, nonByeGames] = gwResults.reduce(
    (acc, result) => {
      if (result.isBye) {
        acc[0].push(result);
      } else {
        acc[1].push(result);
      }
      return acc;
    },
    [[], []] as [T_FETCH_RESULTS['results'], T_FETCH_RESULTS['results']]
  );

  useEffect(() => {
    if (isExpanded && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isExpanded]);

  return (
    <div ref={scrollRef}>
      <CustomAccordion
        key={gameWeek}
        isExpanded={isExpanded}
        title={
          <AccordionTitle
            gameWeek={gameWeek}
            gwResults={gwResults}
            isExpanded={isExpanded}
            isAdminView={isAdminView}
          />
        }
      >
        <>
          {Object.entries(
            nonByeGames.reduce<Record<string, typeof gwResults>>((acc, r) => {
              const key = (r?.date || '').split('T')[0] || 'unknown';
              if (!acc[key]) acc[key] = [] as typeof gwResults;
              acc[key].push(r);
              return acc;
            }, {})
          )
            // sort dates descending (newest first)
            .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
            .map(([dateKey, dateResults]) => (
              <SectionContainer
                type="form"
                key={`${gameWeek}-${dateKey}`}
                subtitle={
                  <CustomTypography bold size="xs" color="data">
                    {parseDate(dateKey)}
                  </CustomTypography>
                }
              >
                <ResultTable results={dateResults} />
              </SectionContainer>
            ))}
          <ByeGames results={byeGames} />
        </>
      </CustomAccordion>
    </div>
  );
}
