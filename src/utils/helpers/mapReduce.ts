import { getSum } from './getSum';

export const mapReduce: Function = (arr: Array<{}>, stat: string): number =>
  arr.map((elem) => +elem[stat]).reduce(getSum, 0);
