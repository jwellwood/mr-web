import React from 'react';
import { IMAGE_TYPE } from 'app/constants';
import CustomAvatar from 'components/avatars/CustomAvatar';
import { PresentationModal } from 'components/modals';
import { CustomTypography } from 'components/typography';
import { IOpponentTable } from 'types';
import { getAvg, getPercentage } from 'utils/helpers';
import HeadToHead from '../containers/HeadToHead';

export const mapOpponentStats = (stats: IOpponentTable[], loading: boolean) => {
  const getPoints = (wins, draws) => {
    return wins * 3 + draws;
  };

  const getAvgScore = (total, goals, conceded) => {
    const avgScored = getAvg(goals, total);
    const avgConceded = getAvg(conceded, total);
    return +(avgScored - avgConceded).toFixed(1);
  };

  return stats?.map((item: IOpponentTable) => ({
    name: {
      value: (
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <CustomAvatar
            size="24px"
            imageUrl={item?.opponentBadge}
            type={IMAGE_TYPE.TEAM}
          />
          <div style={{ marginRight: '4px' }} />
          <PresentationModal
            title="Head to Head"
            fullScreen
            buttonElement={
              <CustomTypography size="xs" color="data" bold>
                {item?.opponentName}
              </CustomTypography>
            }
          >
            <HeadToHead opponentId={item._id} />
          </PresentationModal>
        </div>
      ),
    },
    played: item?.total,
    wins: item?.wins,
    draws: item?.draws,
    defeats: item?.losses,
    goalsFor: item?.totalGoalsScored,
    goalsAgainst: item?.totalGoalsConceded,
    difference: item?.totalGoalDifference,
    points: getPoints(item?.wins, item?.draws),
    winPercentage: getPercentage(item?.wins, item?.total, 1),
    avgScore: getAvgScore(
      item?.total,
      item?.totalGoalsScored,
      item?.totalGoalsConceded
    ),
  }));
};
