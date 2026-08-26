import { useMemo } from 'react';
import { useCompetitionOptions } from '../../competitions/hooks/useCompetitionOptions';
import { T_FETCH_ORG_SEASON } from '../graphql';

export const useCompetitionConfigs = (
  season?: T_FETCH_ORG_SEASON['orgSeason']
): {
  sortedCompetitionConfigs: T_FETCH_ORG_SEASON['orgSeason']['competitionConfigs'];
  compType: (competitionId: string) => string;
} => {
  const { competitionOptions } = useCompetitionOptions();

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

  const compType = (competitionId: string) =>
    String(competitionOptions?.find(comp => comp.value === competitionId)?.meta?.competitionType);

  return { sortedCompetitionConfigs, compType };
};
