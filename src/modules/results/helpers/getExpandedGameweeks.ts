import { T_FETCH_RESULTS } from '../graphql';

// Sunday fixtures stay selected until Wednesday.
const GRACE_MS = 3 * 24 * 60 * 60 * 1000;

export const getExpandedGameweeks = (
  resultsByGameWeek: Record<string, T_FETCH_RESULTS['results'][number][]>
) => {
  const threshold = new Date(Date.now() - GRACE_MS);
  let expandedGameWeek: string | null = null;
  let closestFutureDate: Date | null = null;
  Object.entries(resultsByGameWeek).forEach(([gw, gwRes]) => {
    gwRes.forEach(r => {
      const d = r?.date ? new Date(r.date) : null;
      if (d && d >= threshold && (!closestFutureDate || d < closestFutureDate)) {
        closestFutureDate = d;
        expandedGameWeek = gw;
      }
    });
  });
  return expandedGameWeek;
};
