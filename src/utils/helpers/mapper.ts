import { MatchStatsKeys } from 'types';

export const mapper: Function = (arr: Array<{}>, stat: MatchStatsKeys) =>
  arr.map((elem: any) => elem[stat]);
