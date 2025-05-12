import { IListItem, IMostGoalsInMatch } from '../../../types';
import { CustomTypography } from '../../../components/typography';
import { parseDate } from '../../../utils/helpers';
import { SectionContainer } from '../../../components/containers';
import { theme } from '../../../theme';
import LinksList from '../../../components/lists/LinksList.tsx';

type Props = {
  title: string;
  data: IMostGoalsInMatch[];
  loading: boolean;
};

function MostInGame({ data, title }: Props) {
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
        link: item.matchId,
      };
    }) || [];
  return (
    <SectionContainer background={theme.palette.dark.main}>
      <CustomTypography color="label" bold size="xs">
        {title}
      </CustomTypography>
      <LinksList links={listData} />
    </SectionContainer>
  );
}

export default MostInGame;
