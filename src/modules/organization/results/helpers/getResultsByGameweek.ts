import { T_FETCH_FIXTURES, T_FETCH_RESULTS } from '../../graphql';

export const getResultsByGameWeek = (
  results: T_FETCH_RESULTS['results'] | T_FETCH_FIXTURES['fixtures']
): Record<
  string,
  (T_FETCH_RESULTS['results'][number] | T_FETCH_FIXTURES['fixtures'][number])[]
> => {
  return results.reduce<
    Record<string, (T_FETCH_RESULTS['results'][number] | T_FETCH_FIXTURES['fixtures'][number])[]>
  >((acc, result) => {
    const { gameWeek } = result;
    if (!acc[gameWeek]) {
      acc[gameWeek] = [];
    }

    acc[gameWeek].push(result);
    return acc;
  }, {});
};
