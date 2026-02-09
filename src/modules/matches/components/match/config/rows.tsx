import { ReactElement } from 'react';
import { CustomTypography, SectionContainer } from '../../../../../components';
import { STAT_ICONS, StatIcon } from '../../../../../components/icons';
import TextList from '../../../../../components/lists/TextList';
import { IListItem } from '../../../../../components/lists/types';
import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { PresentationModal } from '../../../../../components/modals';
import { T_FETCH_MATCH } from '../../../types';

export const rows = (
  currentPlayers?: T_FETCH_MATCH['match']['matchPlayers'],
  loading?: boolean
) => {
  const arr = new Array(15).fill({});
  const mappedData = loading || !currentPlayers?.length ? arr : currentPlayers;

  const players = mappedData?.filter(cp => cp !== undefined) || [];

  return players?.map(player => {
    const {
      name,
      isStarter,
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

    const renderValue = (value: string | number | { value: string | boolean | ReactElement }) =>
      loading ? <StatSkeleton /> : value;

    const listData = [
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.GOAL} />,
        label: 'Goals',
        value: renderValue(goals || 0),
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.ASSIST} />,
        label: 'Assists',
        value: renderValue(assists || 0),
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.PEN_SCORED} />,
        label: 'Pens Scored',
        value: renderValue(pensScored || 0),
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.PEN_MISSED} />,
        label: 'Pens Missed',
        value: renderValue(pensMissed || 0),
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.OWN_GOAL} />,
        label: 'Own Goals',
        value: renderValue(ownGoals || 0),
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.MVP} />,
        label: 'MVP',
        value: renderValue(mvp ? 1 : 0),
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.YELLOW_CARD} />,
        label: 'Yellow Cards',
        value: renderValue(yellowCards || 0),
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.RED_CARD} />,
        label: 'Red Cards',
        value: renderValue(redCard ? 1 : 0),
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.CONCEDED} />,
        label: 'Conceded',
        value: renderValue(conceded || 0),
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.PEN_SAVED} />,
        label: 'Penalties Saved',
        value: renderValue(pensSaved || 0),
      },
      {
        icon: <StatIcon size="1.5rem" icon={STAT_ICONS.CLEAN_SHEET} />,
        label: 'Clean Sheets',
        value: renderValue(cleanSheet ? 1 : 0),
      },
    ] as const;

    const nameData = (
      <PresentationModal
        buttonElement={
          <CustomTypography bold size="sm" color="data">
            {name}
          </CustomTypography>
        }
      >
        <SectionContainer title={name}>
          <TextList data={listData as unknown as IListItem[]} />
        </SectionContainer>
      </PresentationModal>
    );

    return {
      isStarter: renderValue({ value: !isStarter && <StatIcon icon="subIn" /> }),
      position: renderValue(position),
      name: loading ? <CustomSkeleton width="140px" /> : { value: nameData },
      goals: renderValue(goals),
      assists: renderValue(assists),
      conceded: renderValue(conceded),
      mvp: renderValue({ value: mvp ? <StatIcon icon="mvp" size="1rem" /> : '' }),
    };
  });
};
