import { STAT_ICONS } from '../../../app/icons';
import StatIcon from '../../../components/icons/StatIcon';
import { CustomTypography } from '../../../components/typography';
import { IPlayerInMatch } from '../../../types';
import AddStats from '../containers/AddStats';
import { ReactNode } from 'react';

export const statsDataAll = (
  currentPlayers?: Partial<IPlayerInMatch[]>,
  isForm?: boolean
): {
  name: {
    value: ReactNode;
  };
  isStarter: {
    value: ReactNode;
  };
  matchPosition: string;
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
  minutes: string | number;
}[] => {
  const players = currentPlayers?.filter(cp => cp !== undefined) || [];
  return players.map(player => {
    const {
      name,
      isStarter,
      matchPosition,
      minutes,
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

    const nameData = isForm ? (
      <AddStats
        playerId={_id as string}
        title={name}
        currentPlayers={players}
        buttonElement={
          <CustomTypography bold size="sm" color="data">
            {name}
          </CustomTypography>
        }
      />
    ) : (
      <CustomTypography bold size="sm" color="data">
        {name}
      </CustomTypography>
    );

    return {
      isStarter: {
        value: !isStarter ? <StatIcon icon={STAT_ICONS.SUB_IN} /> : '',
      },
      matchPosition,
      name: { value: nameData },
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
      minutes: minutes || '',
    };
  });
};
