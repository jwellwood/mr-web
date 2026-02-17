import { T_FETCH_PLAYER_SEASONS_SUMMARY } from '../../../types';

export const rows = (data?: T_FETCH_PLAYER_SEASONS_SUMMARY['seasons']) => {
  const maxGoals = Math.max(...(data?.map(season => season.goals) || [0]));
  const maxAssists = Math.max(...(data?.map(season => season.assists) || [0]));
  const maxCombined = Math.max(...(data?.map(season => season.goals + season.assists) || [0]));

  const rowData = [
    {
      label: 'Goals',
      value: maxGoals,
    },
    {
      label: 'Assists',
      value: maxAssists,
    },
    {
      label: 'Combined',
      value: maxCombined,
    },
  ];

  return rowData.map(item => {
    return {
      label: item.label,
      value: item.value,
    };
  });
};
