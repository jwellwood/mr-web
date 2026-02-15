import { STAT_ICONS, StatIcon } from '../../../../components/icons';
import { CustomTypography } from '../../../../components/typography';
import { TApolloError } from '../../../../types/apollo';
import AddStats from '../../forms/add-match-player-stats/AddStats';
import { ITempMatchPlayers } from '../../types';

export const rows = (currentPlayers: ITempMatchPlayers[], error?: TApolloError) => {
  return currentPlayers.map(player => {
    const nameData = (
      <AddStats
        playerId={player.playerId as string}
        title={player.playerName}
        buttonElement={
          <CustomTypography bold size="sm" color="data">
            {player.playerName}
          </CustomTypography>
        }
        error={error}
      />
    );

    return {
      playerName: nameData,
      isStarter: !player.isStarter ? <StatIcon icon={STAT_ICONS.SUB_IN} /> : '',
      matchPosition: player.matchPosition,
      goals: player.goals || '',
      assists: player.assists || '',
      mvp: player.mvp ? 1 : '',
      pensScored: player.pensScored || '',
      pensMissed: player.pensMissed || '',
      ownGoals: player.ownGoals || '',
      conceded: player.conceded || '',
      pensSaved: player.pensSaved || '',
      cleanSheet: player.cleanSheet ? 1 : '',
      yellowCards: player.yellowCards || '',
      redCard: player.redCard ? 1 : '',
    };
  });
};
