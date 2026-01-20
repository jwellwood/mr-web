import { ReactElement, ReactNode } from 'react';
import { ApolloError } from '@apollo/client';

import { IPlayerInMatch } from '../../../../types';
import AddStats from '../../../add-match-player-stats/AddStats';
import { CustomTypography, PositionCell } from '../../../../../../components';
import StatIcon from '../../../../../../components/icons/StatIcon';
import { STAT_ICONS } from '../../../../../../components/icons/icons';

export const rows = (
  currentPlayers: Partial<IPlayerInMatch[]>,
  error?: ApolloError
): {
  playerName: { value: ReactNode };
  isStarter: { value: ReactNode };
  matchPosition: string | ReactElement;
  goals: string | number;
  assists: string | number;
  mvp: string | number;
  pensScored: string | number;
  pensMissed: string | number;
  ownGoals: string | number;
  conceded: string | number;
  pensSaved: string | number;
  cleanSheet: string | number;
  yellowCards: string | number;
  redCard: string | number;
}[] => {
  const players = currentPlayers?.filter(cp => cp !== undefined) || [];
  return players.map(player => {
    const {
      name,
      isStarter,
      matchPosition,
      _id,
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
        playerId={_id as string}
        title={name}
        currentPlayers={players}
        buttonElement={
          <CustomTypography bold size="sm" color="data">
            {name}
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
