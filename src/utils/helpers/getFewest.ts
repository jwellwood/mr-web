export function getFewest(arr: Array<number | string>): number {
  return arr.reduce((smallest: number, numOrStr) => {
    if (typeof numOrStr === 'string') {
      const int = parseInt(numOrStr, 10);
      return isNaN(int) ? smallest : Math.min(smallest, int);
    }
    return Math.min(smallest, numOrStr);
  }, 0);
}
