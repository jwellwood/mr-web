import { CustomTypography, ImageAvatar } from '../../../../../components';
import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { PresentationModal } from '../../../../../components/modals';
import { IMAGE_TYPE } from '../../../../../constants';
import { getAvg, getPercentage } from '../../../../../utils';
import PlayerMatchesByOpponent from '../../../containers/PlayerMatchesByOpponent';
import { T_FETCH_PLAYER_OPPONENT_STATS } from '../../../types';

export const rows_averages = (
  stats?: T_FETCH_PLAYER_OPPONENT_STATS['stats'],
  loading?: boolean
) => {
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
      winsAvg: 0,
      draws: 0,
      drawsAvg: 0,
      losses: 0,
      lossesAvg: 0,
      goalsFor: 0,
      goalsForAvg: 0,
      goalsAgainst: 0,
      goalsAgainstAvg: 0,
      difference: 0,
      differenceAvg: 0,
      goals: 0,
      goalsAvg: 0,
      assists: 0,
      assistsAvg: 0,
      conceded: 0,
      concededAvg: 0,
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
      winsAvg: loading ? <StatSkeleton /> : getPercentage(wins, matches, 1),
      draws: loading ? <StatSkeleton /> : draws,
      drawsAvg: loading ? <StatSkeleton /> : getPercentage(draws, matches, 1),
      losses: loading ? <StatSkeleton /> : losses,
      lossesAvg: loading ? <StatSkeleton /> : getPercentage(losses, matches, 1),
      goalsFor: loading ? <StatSkeleton /> : goalsFor,
      goalsForAvg: loading ? <StatSkeleton /> : getAvg(goalsFor, matches, 2),
      goalsAgainst: loading ? <StatSkeleton /> : goalsAgainst,
      goalsAgainstAvg: loading ? <StatSkeleton /> : getAvg(goalsAgainst, matches, 2),
      difference: loading ? <StatSkeleton /> : goalsFor - goalsAgainst,
      differenceAvg: loading ? <StatSkeleton /> : getAvg(goalsFor - goalsAgainst, matches, 2),
      goals: loading ? <StatSkeleton /> : goals,
      goalsAvg: loading ? <StatSkeleton /> : getAvg(goals, matches, 1),
      assists: loading ? <StatSkeleton /> : assists,
      assistsAvg: loading ? <StatSkeleton /> : getAvg(assists, matches, 1),
      combined: loading ? <StatSkeleton /> : goals + assists,
      combinedAvg: loading ? <StatSkeleton /> : getAvg(goals + assists, matches, 1),
      conceded: loading ? <StatSkeleton /> : conceded,
      concededAvg: loading ? <StatSkeleton /> : getAvg(conceded, matches, 1),
    };
  });
};
