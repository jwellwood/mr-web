import { useMemo } from 'react';
import { T_FETCH_ORG_SEASON } from '../graphql';

export const useCompetitionConfigs = (
  season?: T_FETCH_ORG_SEASON['orgSeason']
): {
  sortedCompetitionConfigs: T_FETCH_ORG_SEASON['orgSeason']['competitionConfigs'];
} => {
  const sortedCompetitionConfigs = useMemo(() => {
    if (!season) {
      return [];
    }
    return season && season.competitionConfigs
      ? [...season.competitionConfigs].sort((a, b) => {
          return (a?.priority ?? 99) - (b?.priority ?? 99);
        })
      : [];
  }, [season]);

  return { sortedCompetitionConfigs };
};
