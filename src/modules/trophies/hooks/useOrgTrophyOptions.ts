import { useMemo } from 'react';
import type { ISelectOptions } from '../../../components';
import { useCompetitionOptions } from '../../competitions/hooks/useCompetitionOptions';
import useCompetitionConfig from '../../results/hooks/useCompetitionConfig';

export const useOrgTrophyOptions = (orgSeasonId: string) => {
  const {
    competitionOptions,
    loading: loadingCompetitions,
    error: competitionsError,
  } = useCompetitionOptions();
  const {
    competitionConfig,
    loading: loadingConfig,
    error: configError,
  } = useCompetitionConfig(orgSeasonId);

  const teamOptionsByCompetition = useMemo<Record<string, ISelectOptions[]>>(
    () =>
      Object.fromEntries(
        (competitionConfig ?? []).map(config => [
          config.competitionId._id,
          (config.teams ?? []).map(({ teamId }) => ({ value: teamId._id, label: teamId.teamName })),
        ])
      ),
    [competitionConfig]
  );

  return {
    competitionOptions,
    teamOptionsByCompetition,
    loading: loadingCompetitions || loadingConfig,
    error: competitionsError || configError,
  };
};
