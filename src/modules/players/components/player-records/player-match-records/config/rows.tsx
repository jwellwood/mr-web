import { StatSkeleton, CustomSkeleton } from '../../../../../../components/loaders';
import PlayerMatchesWithMostAssists from '../../../../containers/PlayerMatchesWithMostAssists';
import PlayerMatchesWithMostCombined from '../../../../containers/PlayerMatchesWithMostCombined';
import PlayerMatchesWithMostGoals from '../../../../containers/PlayerMatchesWithMostGoals';
import { T_FETCH_PLAYER_MATCH_RECORDS } from '../../../../types';

export const rows = (stats?: T_FETCH_PLAYER_MATCH_RECORDS['stats'], loading?: boolean) => {
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
      value: loading ? <StatSkeleton /> : item.value,
      more: loading ? <CustomSkeleton width="50px" /> : { value: item.value ? item.component : '' },
    };
  });
};
