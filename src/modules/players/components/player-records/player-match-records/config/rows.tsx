import PlayerMatchesWithMostAssists from '../../../../containers/PlayerMatchesWithMostAssists';
import PlayerMatchesWithMostCombined from '../../../../containers/PlayerMatchesWithMostCombined';
import PlayerMatchesWithMostGoals from '../../../../containers/PlayerMatchesWithMostGoals';
import { T_FETCH_PLAYER_MATCH_RECORDS } from '../../../../types';

export const rows = (stats?: T_FETCH_PLAYER_MATCH_RECORDS['stats']) => {
  const { maxGoals, maxAssists, maxCombined } = stats || {
    maxGoals: 0,
    maxAssists: 0,
    maxCombined: 0,
  };

  const data = [
    {
      label: 'Goals',
      value: maxGoals,
      component: <PlayerMatchesWithMostGoals record={maxGoals} />,
    },
    {
      label: 'Assists',
      value: maxAssists,
      component: <PlayerMatchesWithMostAssists record={maxAssists} />,
    },
    {
      label: 'Combined',
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
