import { CustomTypography, ImageAvatar } from '../../../../../components';
import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { PresentationModal } from '../../../../../components/modals';
import { IMAGE_TYPE } from '../../../../../constants';
import PlayerMatchesByOpponent from '../../../containers/PlayerMatchesByOpponent';
import { T_FETCH_PLAYER_OPPONENT_STATS } from '../../../types';

export const rows = (stats?: T_FETCH_PLAYER_OPPONENT_STATS['stats'], loading?: boolean) => {
  const dataStats = stats;
  const arr = new Array(15).fill({});
  const statsToDisplay = loading ? arr : dataStats;

  return statsToDisplay?.map(item => {
    const {
      opponent,
      opponentId,
      opponentBadge,
      matches,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      goals,
      assists,
      conceded,
    } = item || {
      opponent: '',
      opponentId: '',
      opponentBadge: { url: '' },
      matches: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      difference: 0,
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
              fallbackIcon={IMAGE_TYPE.BADGE}
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
      wins: loading ? <StatSkeleton /> : wins,
      draws: loading ? <StatSkeleton /> : draws,
      losses: loading ? <StatSkeleton /> : losses,
      goalsFor: loading ? <StatSkeleton /> : goalsFor,
      goalsAgainst: loading ? <StatSkeleton /> : goalsAgainst,
      difference: loading ? <StatSkeleton /> : goalsFor - goalsAgainst,
      goals: loading ? <StatSkeleton /> : goals,
      assists: loading ? <StatSkeleton /> : assists,
      combined: loading ? <StatSkeleton /> : goals + assists,
      conceded: loading ? <StatSkeleton /> : conceded,
    };
  });
};
