import type { TFunction } from 'i18next';
import PlayerMatchesWithMostAssists from '../../../containers/PlayerMatchesWithMostAssists';
import PlayerMatchesWithMostCombined from '../../../containers/PlayerMatchesWithMostCombined';
import PlayerMatchesWithMostGoals from '../../../containers/PlayerMatchesWithMostGoals';
import { T_FETCH_PLAYER_MATCH_RECORDS } from '../../../graphql';

export const rows = (t: TFunction, stats?: T_FETCH_PLAYER_MATCH_RECORDS['stats']) => {
  const { maxGoals, maxAssists, maxCombined } = stats || {
    maxGoals: 0,
    maxAssists: 0,
    maxCombined: 0,
  };

  const data = [
    {
      label: t('TABLES.ROWS.GOALS'),
      value: maxGoals,
      component: <PlayerMatchesWithMostGoals record={maxGoals} />,
    },
    {
      label: t('TABLES.ROWS.ASSISTS'),
      value: maxAssists,
      component: <PlayerMatchesWithMostAssists record={maxAssists} />,
    },
    {
      label: t('TABLES.ROWS.COMBINED'),
      value: maxCombined,
      component: <PlayerMatchesWithMostCombined record={maxCombined} />,
    },
  ];

  return data.map(item => {
    return {
      label: item.label,
      value: item.value,
      more: item.value ? item.component : '',
    };
  });
};
