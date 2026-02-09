import { ApolloError } from '@apollo/client';

import AddStats from '../../../add-match-player-stats/AddStats';
import { CustomTypography, PositionCell } from '../../../../../../components';
import { STAT_ICONS, StatIcon } from '../../../../../../components/icons';
import { ITempMatchPlayers } from '../../../../types';

export const rows = (currentPlayers: ITempMatchPlayers[], error?: ApolloError) => {
  return currentPlayers.map(player => {
    const {
      playerName,
      isStarter,
      matchPosition,
      playerId,
      goals,
      pensMissed,
      pensScored,
      pensSaved,
      redCard,
      yellowCards,
      ownGoals,
      assists,
      mvp,
      conceded,
      cleanSheet,
    } = player;

    const nameData = (
      <AddStats
        playerId={playerId as string}
        title={playerName}
        buttonElement={
          <CustomTypography bold size="sm" color="data">
            {playerName}
          </CustomTypography>
        }
        error={error}
      />
    );

    return {
      playerName: { value: nameData },
      isStarter: {
        value: !isStarter ? <StatIcon icon={STAT_ICONS.SUB_IN} /> : '',
      },
      matchPosition: <PositionCell>{matchPosition}</PositionCell>,
      goals: goals || '',
      assists: assists || '',
      mvp: mvp ? 1 : '',
      pensScored: pensScored || '',
      pensMissed: pensMissed || '',
      ownGoals: ownGoals || '',
      conceded: conceded || '',
      pensSaved: pensSaved || '',
      cleanSheet: cleanSheet ? 1 : '',
      yellowCards: yellowCards || '',
      redCard: redCard ? 1 : '',
    };
  });
};
