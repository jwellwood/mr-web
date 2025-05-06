import { MatchStatsKeys } from 'types';

export const sortArr: Function = (
  arr: Array<[]>,
  stat: MatchStatsKeys
): Array<[]> =>
  [...arr].sort((a: any, b: any) => parseFloat(b[stat]) - parseFloat(a[stat]));
