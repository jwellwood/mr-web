export function getPercentage (
  value: number,
  max: number,
  fix: number = 0
): number {
  const percentage: number = (value * 100) / max;
  if (isNaN(percentage)) return 0;
  return +percentage.toFixed(fix);
};
