export function getAvg(stat: number | string, total: number | string, fix: number = 2): string {
  if (!total || total === 0) {
    return Number(0).toFixed(fix);
  }
  return (+stat / +total).toFixed(fix);
}
