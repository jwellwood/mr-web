import { getAvg, getPercentage } from '../../../utils/helpers';
import HeadToHead from '../containers/HeadToHead';
import { IMAGE_TYPE } from '../../../constants';
import { PresentationModal } from '../../../components/modals';
import CustomTypography from '../../../components/typography/CustomTypography.tsx';
import { IOpponentTable } from '../types.ts';
import ImageAvatar from '../../../components/avatars/image-avatar/ImageAvatar.tsx';

export const mapOpponentStats = (stats: IOpponentTable[]) => {
  const getPoints = (wins: number, draws: number) => {
    return wins * 3 + draws;
  };

  const getAvgScore = (total: number, goals: number, conceded: number): number => {
    const avgScored = getAvg(goals, total);
    const avgConceded = getAvg(conceded, total);
    return +(Number(avgScored) - Number(avgConceded)).toFixed(1);
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
          <ImageAvatar
            size="24px"
            imageUrl={item?.opponentBadge || 'default'}
            fallbackIcon={IMAGE_TYPE.TEAM}
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
    avgScore: getAvgScore(item?.total, item?.totalGoalsScored, item?.totalGoalsConceded),
  }));
};
