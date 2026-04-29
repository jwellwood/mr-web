import { T_FETCH_RESULTS } from '../graphql';

export const getResultsByGameWeek = (
  results: T_FETCH_RESULTS['results']
): Record<string, T_FETCH_RESULTS['results'][number][]> => {
  return results.reduce<Record<string, T_FETCH_RESULTS['results'][number][]>>((acc, result) => {
    const { gameWeek } = result;
    if (!acc[gameWeek]) {
      acc[gameWeek] = [];
    }

    acc[gameWeek].push(result);
    return acc;
  }, {});
};
