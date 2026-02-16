import { CustomTypography, ImageAvatar } from '../../../../../components';
import { CustomSkeleton } from '../../../../../components/loaders';
import { PresentationModal } from '../../../../../components/modals';
import { IMAGE_TYPE } from '../../../../../constants';
import { getAvg, getPercentage } from '../../../../../utils';
import PlayerMatchesByOpponent from '../../../containers/PlayerMatchesByOpponent';
import { T_FETCH_PLAYER_OPPONENT_STATS } from '../../../types';

export const rows = (
  stats?: T_FETCH_PLAYER_OPPONENT_STATS['stats'],
  loading?: boolean,
  averages?: boolean
) => {
  const arr = new Array(15).fill({});
  const statsToDisplay = loading ? arr : (stats ?? []);

  return statsToDisplay.map(item => {
    const { opponent, opponentId, opponentBadge } = item || {
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
      combined: 0,
      combinedAvg: 0,
      conceded: 0,
      concededAvg: 0,
    };

    const base = {
      name: (
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
      matches: item?.matches,
      wins: item?.wins,
      draws: item?.draws,
      losses: item?.losses,
      goalsFor: item?.goalsFor,
      goalsAgainst: item?.goalsAgainst,
      difference: item?.goalsFor - item?.goalsAgainst,
      goals: item?.goals,
      assists: item?.assists,
      combined: item?.goals + item?.assists,
      conceded: item?.conceded,
    } as const;

    if (!averages) return base;

    return {
      name: base.name,
      matches: base.matches,
      wins: base.wins,
      winsAvg: getPercentage(item?.wins, item?.matches, 1),
      draws: base.draws,
      drawsAvg: getPercentage(item?.draws, item?.matches, 1),
      losses: base.losses,
      lossesAvg: getPercentage(item?.losses, item?.matches, 1),
      goalsFor: base.goalsFor,
      goalsForAvg: +getAvg(item?.goalsFor, item?.matches, 2),
      goalsAgainst: base.goalsAgainst,
      goalsAgainstAvg: +getAvg(item?.goalsAgainst, item?.matches, 2),
      difference: base.difference,
      differenceAvg: +getAvg(item?.goalsFor - item?.goalsAgainst, item?.matches, 1),
      goals: base.goals,
      goalsAvg: +getAvg(item?.goals, item?.matches, 1),
      assists: base.assists,
      assistsAvg: +getAvg(item?.assists, item?.matches, 1),
      combined: base.combined,
      combinedAvg: +getAvg(item?.goals + item?.assists, item?.matches, 1),
      conceded: base.conceded,
      concededAvg: +getAvg(item?.conceded, item?.matches, 1),
    } as const;
  });
};
