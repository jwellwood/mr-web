import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomTypography, SectionContainer } from '../../../../components';
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
}

export default function AccordionSection({
  competitionName,
  gameWeek,
  gwResults,
  isExpanded,
}: Props) {
  const { t } = useTranslation('results');
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
        key={`${competitionName}-${gameWeek}`}
        isExpanded={isExpanded}
        title={<AccordionTitle gameWeek={gameWeek} gwResults={gwResults} isExpanded={isExpanded} />}
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
                type="success"
                key={`${competitionName}-${gameWeek}-${dateKey}`}
                title={parseDate(dateKey)}
              >
                <ResultTable results={dateResults} />
              </SectionContainer>
            ))}
          {byeGames.length > 0 && (
            <SectionContainer key={`${competitionName}-${gameWeek}-bye`} title={t('BYE_GAMES')}>
              {byeGames.map(result => (
                <div key={result._id}>
                  <CustomTypography color="data" bold>
                    {result.homeTeam?.teamName}
                  </CustomTypography>
                </div>
              ))}
            </SectionContainer>
          )}
        </>
      </CustomAccordion>
    </div>
  );
}
