import { CustomTypography, ImageAvatar, NoDataText } from '../../../../../components';
import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { PresentationModal } from '../../../../../components/modals';
import { IMAGE_TYPE } from '../../../../../constants';
import { getAvg } from '../../../../../utils/helpers';
import { IPlayerVsStats } from '../../../../matches/types';

export const rows = (stats?: IPlayerVsStats[], loading?: boolean) => {
  const arr = new Array(15).fill({});
  const statsToDisplay = loading || !stats?.length ? arr : stats;

  return statsToDisplay?.map((item: IPlayerVsStats) => {
    const { opponent, opponentBadge, matches, goals, assists, conceded } = item || {
      opponent: '',
      opponentBadge: { url: '' },
      matches: 0,
      goals: 0,
      assists: 0,
      conceded: 0,
    };
    return {
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
              imageUrl={opponentBadge || 'default'}
              fallbackIcon={IMAGE_TYPE.TEAM}
              loading={loading}
            />
            <div style={{ marginRight: '4px' }} />
            {loading ? (
              <CustomSkeleton width="100px" />
            ) : (
              <PresentationModal
                title="Matches"
                fullScreen
                buttonElement={
                  <CustomTypography size="xs" color="data" bold>
                    {opponent}
                  </CustomTypography>
                }
              >
                <NoDataText>Feature coming soon!</NoDataText>
              </PresentationModal>
            )}
          </div>
        ),
      },
      matches: loading ? <StatSkeleton /> : matches,
      goals: loading ? <StatSkeleton /> : goals,
      goalsAvg: loading ? <StatSkeleton /> : getAvg(goals, matches, 1),
      assists: loading ? <StatSkeleton /> : assists,
      assistsAvg: loading ? <StatSkeleton /> : getAvg(assists, matches, 1),
      conceded: loading ? <StatSkeleton /> : conceded,
      concededAvg: loading ? <StatSkeleton /> : getAvg(conceded, matches, 1),
    };
  });
};
