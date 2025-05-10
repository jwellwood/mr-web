import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import { ICompetition, ITeam } from '../../../types';
import {GET_ORG, GET_TEAMS_BY_ORG} from "../../organization/graphql";
export const useMatchDetailsInput = () => {
  const { orgId } = useCustomParams();
  const [opponents, setOpponents] = useState<ITeam[]>([]);
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);
  const { loading: loadingSeasons, seasonOptions } = useSeasons();
  const [
    getTeamByOrg,
    { data: teams, loading: teamsLoading, error: teamsError },
  ] = useLazyQuery(GET_TEAMS_BY_ORG, { variables: { orgId } });

  const [getOrgById, { data: orgData, loading: orgLoading, error: orgError }] =
    useLazyQuery(GET_ORG, { variables: { orgId } });

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

  return {
    orgId,
    seasonOptions,
    opponents,
    competitions,
    loading,
    error,
  };
};
