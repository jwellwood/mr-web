import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import { FETCH_ORG, FETCH_ORG_TEAMS } from '../../organization/graphql';
import { ICompetition } from '../../organization/types';
import { ITeam } from '../../team/types';

export const useMatchDetailsInput = () => {
  const { orgId } = useCustomParams();
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

  return {
    orgId,
    seasonOptions,
    opponents,
    competitions,
    loading,
    error,
  };
};
