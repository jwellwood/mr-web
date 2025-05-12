export function getMost(arr: Array<number | string>): number {
  return arr.reduce((max: number, numOrString) => {
    if (typeof numOrString === 'string') {
      const parsed = parseInt(numOrString, 10);
      return isNaN(parsed) ? max : Math.max(max, parsed);
    }
    return Math.max(max, numOrString);
  }, 0);
}
