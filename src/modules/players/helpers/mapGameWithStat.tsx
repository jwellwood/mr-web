import { CustomTypography } from '../../../components/typography';
import { IListItem, IPlayerStats } from '../../../types';
import { getPercentage } from '../../../utils/helpers';

export const mapGameWithStat = (player: IPlayerStats) => {
  const { apps, gamesWithGoal, gamesWithAssist, gamesWithGoalAndAssist, gamesWithGoalOrAssist } =
    player;

  const data: IListItem[] = [
    {
      label: 'Scored in',
      value: (
        <CustomTypography color="data" bold>
          ({gamesWithGoal}) {getPercentage(gamesWithGoal, apps, 1)}%
        </CustomTypography>
      ),
    },
    {
      label: 'Assisted in',
      value: (
        <CustomTypography color="data" bold>
          ({gamesWithAssist}) {getPercentage(gamesWithAssist, apps, 1)}%
        </CustomTypography>
      ),
    },
    {
      label: 'Scored and Assisted in',
      value: (
        <CustomTypography color="data" bold>
          ({gamesWithGoalAndAssist}) {getPercentage(gamesWithGoalAndAssist, apps, 1)}%
        </CustomTypography>
      ),
    },
    {
      label: 'Scored or Assisted in',
      value: (
        <CustomTypography color="data" bold>
          ({gamesWithGoalOrAssist}) {getPercentage(gamesWithGoalOrAssist, apps, 1)}%
        </CustomTypography>
      ),
    },
  ];

  return data;
};
