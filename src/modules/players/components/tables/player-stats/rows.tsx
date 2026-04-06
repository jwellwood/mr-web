import type { TFunction } from 'i18next';
import { STAT_ICONS, StatIcon } from '../../../../../components/icons';
import { getAvg, getPercentage } from '../../../../../utils';
import { T_FETCH_PLAYER_STATS } from '../../../graphql';

export const rows = (t: TFunction, stats?: T_FETCH_PLAYER_STATS['player']) => {
  const {
    apps,
    goals,
    assists,
    mvp,
    pensScored,
    pensMissed,
    pensSaved,
    ownGoals,
    conceded,
    cleanSheet,
    yellowCards,
    redCard,
  } = stats || {
    apps: 0,
    goals: 0,
    assists: 0,
    mvp: 0,
    pensScored: 0,
    pensMissed: 0,
    pensSaved: 0,
    ownGoals: 0,
    conceded: 0,
    cleanSheet: 0,
    yellowCards: 0,
    redCard: 0,
  };
  return [
    {
      icon: <StatIcon icon={STAT_ICONS.GOAL} />,
      label: t('TABLES.ROWS.GOALS'),
      value: goals,
      average: getAvg(goals || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.ASSIST} />,
      label: t('TABLES.ROWS.ASSISTS'),
      value: assists,
      average: getAvg(assists || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.MVP} />,
      label: t('TABLES.ROWS.MVP'),
      value: mvp,
      average: getAvg(mvp || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.PEN_SCORED} />,
      label: t('TABLES.ROWS.PENS_SCORED'),
      value: pensScored,
      average: (getPercentage(pensScored || 0, (pensScored || 0) + (pensMissed || 0)) || 0) + '%',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.PEN_MISSED} />,
      label: t('TABLES.ROWS.PENS_MISSED'),
      value: pensMissed,
      average: (getPercentage(pensMissed || 0, (pensScored || 0) + (pensMissed || 0)) || 0) + '%',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.OWN_GOAL} />,
      label: t('TABLES.ROWS.OWN_GOALS'),
      value: ownGoals,
      average: getAvg(ownGoals || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.CONCEDED} />,
      label: t('TABLES.ROWS.CONCEDED'),
      value: conceded,
      average: getAvg(conceded || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.PEN_SAVED} />,
      label: t('TABLES.ROWS.PENS_SAVED'),
      value: pensSaved,
      average: '',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.CLEAN_SHEET} />,
      label: t('TABLES.ROWS.CLEAN_SHEETS'),
      value: cleanSheet,
      average: '',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.YELLOW_CARD} />,
      label: t('TABLES.ROWS.YELLOW_CARDS'),
      value: yellowCards,
      average: '',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.RED_CARD} />,
      label: t('TABLES.ROWS.RED_CARDS'),
      value: redCard,
      average: '',
    },
  ];
};
