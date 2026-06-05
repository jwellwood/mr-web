export const getCupRoundLabel = (
  roundNumber: number,
  totalRounds: number,
  t: (key: string, options?: Record<string, unknown>) => string
) => {
  const distanceFromFinal = totalRounds - roundNumber;

  if (distanceFromFinal === 0) return t('CUP_ROUNDS.FINAL');
  if (distanceFromFinal === 1) return t('CUP_ROUNDS.SEMI_FINAL');
  if (distanceFromFinal === 2) return t('CUP_ROUNDS.QUARTER_FINAL');

  return t('CUP_ROUNDS.ROUND', { number: roundNumber });
};
