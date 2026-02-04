import { CustomTypography, ImageAvatar } from '../../../../../components';
import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { PresentationModal } from '../../../../../components/modals';
import { IMAGE_TYPE } from '../../../../../constants';
import { getAvg } from '../../../../../utils/helpers';
import PlayerMatchesByOpponent from '../../../containers/PlayerMatchesByOpponent';
import { T_FETCH_PLAYER_OPPONENT_STATS } from '../../../types';

export const rows = (stats?: T_FETCH_PLAYER_OPPONENT_STATS, loading?: boolean) => {
  const dataStats = stats?.stats;
  const arr = new Array(15).fill({});
  const statsToDisplay = loading || !dataStats?.length ? arr : dataStats;

  return statsToDisplay?.map(item => {
    const { opponent, opponentId, opponentBadge, matches, goals, assists, conceded } = item || {
      opponent: '',
      opponentId: '',
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
                title={`Matches vs ${opponent}`}
                buttonElement={
                  <CustomTypography size="xs" color="data" bold>
                    {opponent}
                  </CustomTypography>
                }
              >
                <PlayerMatchesByOpponent opponentId={opponentId} />
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
