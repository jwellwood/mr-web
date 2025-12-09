import { CustomTypography } from '../../../components/typography';
import { parseDate } from '../../../utils/helpers';
import { SectionContainer } from '../../../components';
import LinksList from '../../../components/lists/LinksList.tsx';
import { IMostGoalsInMatch } from '../../matches/types.ts';
import { IListItem } from '../../../components/lists/types.ts';

interface Props {
  title: string;
  data: IMostGoalsInMatch[];
  loading: boolean;
}

export default function MostInMatch({ data, title }: Props) {
  const listData: IListItem[] =
    data?.map(item => {
      const labelColor =
        item.teamGoals > item.opponentGoals
          ? 'primary'
          : item.teamGoals === item.opponentGoals
            ? 'warning'
            : 'error';
      return {
        label: (
          <CustomTypography bold color="data">
            {item.player}
          </CustomTypography>
        ),

        secondary: (
          <CustomTypography color="label" size="xs">
            vs {item.opponentName} |{' '}
            <CustomTypography color={labelColor} size="xs" bold>
              {item.teamGoals}-{item.opponentGoals}
            </CustomTypography>{' '}
            | {parseDate(item.date)}
          </CustomTypography>
        ),
        value: (
          <CustomTypography size="xs" color="data" bold>
            {data && data[0] ? data[0]?.total : ''}
          </CustomTypography>
        ),
        link: `match/${item.matchId}`,
      };
    }) || [];
  return (
    <SectionContainer title={title}>
      <LinksList links={listData} />
    </SectionContainer>
  );
}
