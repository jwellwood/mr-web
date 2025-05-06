export const getMost: Function = (arr: Array<number>): number =>
  arr.length ? Math.max(...arr) : 0;
