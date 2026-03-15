import { CustomTable, CustomTypography, SectionContainer } from '../../../../components';
import { CustomAccordion } from '../../../../components/accordion';
import { CustomStack } from '../../../../components/grids';
import { parseDate } from '../../../../utils';
import { T_FETCH_FIXTURES, T_FETCH_RESULT, T_FETCH_RESULTS } from '../../graphql';
import { getResultsByGameWeek } from '../helpers/getResultsByGameweek';
import { columns } from './columns';
import { rows } from './rows';

interface Props {
  results: T_FETCH_RESULTS['results'] | T_FETCH_FIXTURES['fixtures'];
  orgId: string;
  orgSeasonId: string;
}

export default function ResultsAccordion({ results, orgId, orgSeasonId }: Props) {
  const resultsByGameWeek = getResultsByGameWeek(results);

  const gameweeks = Object.entries(resultsByGameWeek)
    .reverse()
    .map((result, i) => {
      return (
        <CustomAccordion
          isExpanded={i === 0}
          key={result[0]}
          title={
            <CustomStack direction="row" justify="space-between">
              <CustomTypography color="data" bold>
                {`Round ${result[0]}`} -{' '}
                <CustomTypography color="label">
                  {`${result[1].length} game${result[1].length !== 1 ? 's' : ''}`}
                </CustomTypography>
              </CustomTypography>
              <CustomTypography color="label" size="small">
                {parseDate(result[1][0].date)}
              </CustomTypography>
            </CustomStack>
          }
        >
          <CustomTable
            columns={columns}
            rows={rows(result[1] as T_FETCH_RESULT['result'][], orgId, orgSeasonId)}
            loadingRowCount={10}
            isSortable={false}
          />
        </CustomAccordion>
      );
    });

  return <SectionContainer>{gameweeks}</SectionContainer>;
}
