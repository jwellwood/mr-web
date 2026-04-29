import { T_FETCH_RESULTS } from '../graphql';

export const getExpandedGameweeks = (
  resultsByGameWeek: Record<string, T_FETCH_RESULTS['results'][number][]>
) => {
  const now = new Date();
  let expandedGameWeek: string | null = null;
  let closestFutureDate: Date | null = null;
  Object.entries(resultsByGameWeek).forEach(([gw, gwRes]) => {
    gwRes.forEach(r => {
      const d = r?.date ? new Date(r.date) : null;
      if (d && d >= now && (!closestFutureDate || d < closestFutureDate)) {
        closestFutureDate = d;
        expandedGameWeek = gw;
      }
    });
  });
  return expandedGameWeek;
};
