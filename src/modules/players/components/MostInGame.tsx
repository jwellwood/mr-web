import React from 'react';
import { SectionContainer } from 'components/containers';
import LinksList from 'components/lists/LinksList';
import { CustomTypography } from 'components/typography';
import { theme } from 'theme';
import { IListItem, IMostGoalsInMatch } from 'types';
import { parseDate } from 'utils/helpers';

type Props = {
  title: string;
  data: IMostGoalsInMatch[];
  loading: boolean;
};

const MostInGame: React.FC<Props> = ({ data, loading, title }) => {
  const listData: IListItem[] =
    data?.map((item) => {
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
};

export default MostInGame;
