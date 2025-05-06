export const getPercentage: Function = (
  value: number,
  max: number,
  fix: number
): number => {
  const percentage: number = (value * 100) / max;
  if (isNaN(percentage)) return 0;
  return +percentage.toFixed(fix);
};
