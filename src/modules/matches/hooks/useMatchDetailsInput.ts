import { useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import { FETCH_ORG, FETCH_ORG_TEAMS } from '../../organization/graphql';
import { ICompetition } from '../../organization/types';
import { ITeam } from '../../team/types';
import { ISelectOptions } from '../../../components';
import { emptySelectOption } from '../../../constants';

export const useMatchDetailsInput = () => {
  const { orgId, teamId } = useCustomParams();
  const [opponents, setOpponents] = useState<ITeam[]>([]);
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);
  const { loading: loadingSeasons, seasonOptions } = useSeasons();
  const [getTeamByOrg, { data: teams, loading: teamsLoading, error: teamsError }] = useLazyQuery(
    FETCH_ORG_TEAMS,
    { variables: { orgId } }
  );

  const [getOrgById, { data: orgData, loading: orgLoading, error: orgError }] = useLazyQuery(
    FETCH_ORG,
    { variables: { orgId } }
  );

  useEffect(() => {
    if (orgId) {
      getTeamByOrg();
      getOrgById();
    }
  }, [getOrgById, getTeamByOrg, orgId]);

  useEffect(() => {
    if (teams) {
      setOpponents(teams.teams);
    }

    if (orgData) {
      setCompetitions(orgData.org.competitions);
    }
  }, [teams, orgData]);

  const loading = teamsLoading || loadingSeasons || orgLoading;
  const error = teamsError || orgError;

  const opponentOptions: ISelectOptions[] = useMemo(
    () => [
      emptySelectOption,
      ...opponents.map(opponent => ({
        label: opponent.teamName,
        value: opponent._id as string,
        disabled: opponent._id === teamId,
      })),
    ],
    [opponents, teamId]
  );

  const competitionOptions: ISelectOptions[] = useMemo(
    () => [
      emptySelectOption,
      ...competitions.map(competition => ({
        label: competition.name,
        value: competition._id as string,
      })),
    ],
    [competitions]
  );

  const formattedSeasonOptions: ISelectOptions[] = [emptySelectOption, ...seasonOptions];

  return {
    orgId,
    seasonOptions: formattedSeasonOptions,
    opponents,
    opponentOptions,
    competitions,
    competitionOptions,
    loading,
    error,
  };
};
