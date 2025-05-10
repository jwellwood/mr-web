import React from 'react';
import { STAT_ICONS } from '../../../app/icons';
import StatIcon from '../../../components/icons/StatIcon';
import { CustomTypography } from '../../../components/typography';
import { IPlayerInMatch } from '../../../types';import AddStats from '../containers/AddStats';

export const statsDataAll = (
  currentPlayers: Partial<IPlayerInMatch[]>,
  isForm: boolean
) =>
  currentPlayers?.map((player: IPlayerInMatch) => {
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
        playerId={_id}
        title={name}
        currentPlayers={currentPlayers}
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
      position: matchPosition,
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
