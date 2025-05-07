export function getFewest(arr: Array<number>): number {
  return arr.length ? Math.min(...arr) : 0;
}
