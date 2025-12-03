import { CustomAccordion } from '../../../components/accordion';
import { IListItem } from '../../../components/lists/types';
import LinksList from '../../../components/lists/LinksList';
import { CustomTypography } from '../../../components/typography';
import { IResult } from '../types';
import ResultBox from './ResultBox';

type Props = {
  results: IResult[];
};

export default function ResultsAccordion({ results }: Props) {
  const resultsByGameWeek = results
    ? results.reduce<Record<string, IResult[]>>((acc, result) => {
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
        return { link: `result/${res._id}`, label: <ResultBox key={res._id} result={res} /> };
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

  return gameweeks;
}
