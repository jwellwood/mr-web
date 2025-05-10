import React from 'react';
import { STAT_ICONS } from '../../../app/icons';
import { SectionContainer } from '../../../components/containers';
import StatIcon from '../../../components/icons/StatIcon';
import TextList from '../../../components/lists/TextList';
import { PresentationModal } from '../../../components/modals';
import { CustomTypography } from '../../../components/typography';
import { IListItem, IPlayerInMatch } from '../../../types';
import AddStats from '../containers/AddStats';

export const statsData = (
  currentPlayers: Partial<IPlayerInMatch[]>,
  isForm: boolean
) =>
  currentPlayers?.map((player: IPlayerInMatch) => {
    const {
      name,
      isStarter,
      minutes,
      _id,
      position,
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
    const listData: IListItem[] = [
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.MINS} />,
        label: 'Minutes',
        value: minutes || 0,
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.GOAL} />,
        label: 'Goals',
        value: goals || 0,
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.ASSIST} />,
        label: 'Assists',
        value: assists || 0,
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.PEN_SCORED} />,
        label: 'Pens Scored',
        value: pensScored || 0,
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.PEN_MISSED} />,
        label: 'Pens Missed',
        value: pensMissed || 0,
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.OWN_GOAL} />,
        label: 'Own Goals',
        value: ownGoals || 0,
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.MVP} />,
        label: 'MVP',
        value: mvp ? 1 : 0,
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.YELLOW_CARD} />,
        label: 'Yellow Cards',
        value: yellowCards || 0,
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.RED_CARD} />,
        label: 'Red Cards',
        value: redCard ? 1 : 0,
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.CONCEDED} />,
        label: 'Conceded',
        value: conceded || 0,
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.PEN_SAVED} />,
        label: 'Penalties Saved',
        value: pensSaved || 0,
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.CLEAN_SHEET} />,
        label: 'Clean Sheets',
        value: cleanSheet ? 1 : 0,
      },
    ];

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
      <PresentationModal
        buttonElement={
          <CustomTypography bold size="sm" color="data">
            {name}
          </CustomTypography>
        }
      >
        <SectionContainer title={name}>
          <TextList data={listData} />
        </SectionContainer>
      </PresentationModal>
    );

    return {
      isStarter: { value: !isStarter && <StatIcon icon="subIn" /> },
      position: position,
      name: { value: nameData },
      goals: goals,
      assists: assists,
      conceded: conceded,
      mvp: { value: mvp ? <StatIcon icon="mvp" size="1rem" /> : '' },
    };
  });
