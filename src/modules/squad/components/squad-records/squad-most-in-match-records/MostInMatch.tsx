import { LinksList, type IListItem } from '../../../../../components/lists';
import { CustomTypography } from '../../../../../components/typography';
import { parseDate } from '../../../../../utils';
import {
  FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH_QUERY,
  FETCH_SQUAD_RECORD_GOALS_IN_MATCH_QUERY,
} from '../../../types';

interface Props {
  data?:
    | FETCH_SQUAD_RECORD_GOALS_IN_MATCH_QUERY['stats']
    | FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH_QUERY['stats'];
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
