export const getFewest: Function = (arr: Array<number>): number =>
  arr.length ? Math.min(...arr) : 0;
