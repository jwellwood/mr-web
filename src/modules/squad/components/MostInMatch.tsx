import { IListItem, IMostGoalsInMatch } from '../../../types/index.ts';
import { CustomTypography } from '../../../components/typography/index.ts';
import { parseDate } from '../../../utils/helpers/index.ts';
import { SectionContainer } from '../../../components/containers/index.ts';
import LinksList from '../../../components/lists/LinksList.tsx';

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
    <SectionContainer>
      <CustomTypography color="label" bold size="xs">
        {title}
      </CustomTypography>
      <LinksList links={listData} />
    </SectionContainer>
  );
}
