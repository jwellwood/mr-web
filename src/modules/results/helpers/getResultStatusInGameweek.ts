import { T_FETCH_RESULTS } from '../graphql';

export const getResultStatusInGameweek = (results: T_FETCH_RESULTS['results']) => {
  const counts = { confirmed: 0, pending: 0, disputed: 0, submitted: 0 };
  results?.forEach(result => {
    // Treat null/undefined resultStatus as pending
    if (result.resultStatus == null) {
      counts.pending += 1;
      return;
    }
    const s = String(result.resultStatus).toLowerCase();
    if (s.includes('confirm')) counts.confirmed += 1;
    else if (s.includes('dispute')) counts.disputed += 1;
    else if (s.includes('submit')) counts.submitted += 1;
    else if (s.includes('pending')) counts.pending += 1;
  });

  return counts;
};
