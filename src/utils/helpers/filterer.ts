export const filterer: Function = (arr: Array<{}> = [], stat: string): number =>
  arr.filter((elem) => elem[stat]).length;
