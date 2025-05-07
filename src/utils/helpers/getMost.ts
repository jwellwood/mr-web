export function getMost (arr: Array<number>): number {
  return arr.length ? Math.max(...arr) : 0;
}
