import { useEffect, useRef } from 'react';
import { SectionContainer } from '../../../../components';
import { CustomAccordion } from '../../../../components/accordion';
import { parseDate } from '../../../../utils';
import { T_FETCH_RESULTS } from '../../graphql';
import AccordionTitle from './AccordionTitle';
import ResultTable from './ResultTable';

interface Props {
  competitionName: string;
  gameWeek: string;
  gwResults: T_FETCH_RESULTS['results'];
  isExpanded: boolean;
  isFixture?: boolean;
}

export default function AccordionSection({
  competitionName,
  gameWeek,
  gwResults,
  isExpanded,
  isFixture,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && isFixture && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isExpanded, isFixture]);

  return (
    <div ref={scrollRef}>
      <CustomAccordion
        key={`${competitionName}-${gameWeek}`}
        isExpanded={isExpanded}
        title={
          <AccordionTitle
            gameWeek={gameWeek}
            gwResults={gwResults}
            isExpanded={isExpanded}
            isFixture={isFixture}
          />
        }
      >
        <>
          {Object.entries(
            gwResults.reduce<Record<string, typeof gwResults>>((acc, r) => {
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
                type="success"
                key={`${competitionName}-${gameWeek}-${dateKey}`}
                title={parseDate(dateKey)}
              >
                <ResultTable results={dateResults} />
              </SectionContainer>
            ))}
        </>
      </CustomAccordion>
    </div>
  );
}
