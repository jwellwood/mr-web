import { CustomTypography } from '../../../components/typography';
import { parseDate } from '../../../utils/helpers';
import LinksList from '../../../components/lists/links-list/LinksList';
import { IMostGoalsInMatch } from '../../matches/types';
import { IListItem } from '../../../components/lists/types';

interface Props {
  data?: IMostGoalsInMatch[];
  loading: boolean;
}

export default function MostInMatch({ data, loading }: Props) {
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
  return <LinksList links={listData} loading={loading} />;
}
