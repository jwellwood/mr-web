import { CustomTypography, SectionContainer } from '../../../../components';
import { CustomAccordion } from '../../../../components/accordion';
import { IListItem, LinksList } from '../../../../components/lists';
import { T_FETCH_FIXTURES, T_FETCH_RESULT } from '../graphql';
import ResultBox from './ResultBox';

interface Props {
  results: T_FETCH_FIXTURES['fixtures'];
  orgId: string;
  orgSeasonId: string;
}

export default function FixturesAccordion({ results, orgId, orgSeasonId }: Props) {
  const resultsByGameWeek = results
    ? results.reduce<Record<string, T_FETCH_FIXTURES['fixtures'][number][]>>((acc, result) => {
        const { gameWeek } = result;
        if (!acc[gameWeek]) {
          acc[gameWeek] = [];
        }

        acc[gameWeek].push(result);
        return acc;
      }, {})
    : {};

  const gameweeks = Object.entries(resultsByGameWeek)
    .reverse()
    .map((result, i) => {
      const links: IListItem[] = result[1].map(res => {
        return {
          link: `/org/${orgId}/org_season/${orgSeasonId}/result/${res._id}`,
          label: <ResultBox key={res._id} result={res as T_FETCH_RESULT['result']} />,
        };
      });
      return (
        <CustomAccordion
          isExpanded={i === 0}
          key={result[0]}
          title={
            <CustomTypography color="data" bold>
              {`GW ${result[0]}`} -{' '}
              <CustomTypography color="label">
                {`${result[1].length} game${result[1].length !== 1 ? 's' : ''}`}
              </CustomTypography>
            </CustomTypography>
          }
        >
          <LinksList links={links} />
        </CustomAccordion>
      );
    });

  return <SectionContainer>{gameweeks}</SectionContainer>;
}
