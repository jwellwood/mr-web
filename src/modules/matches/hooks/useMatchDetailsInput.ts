import { useLazyQuery } from '@apollo/client/react';
import { useEffect, useMemo } from 'react';
import { ISelectOptions } from '../../../components';
import { emptySelectOption } from '../../../constants';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import { FETCH_ORG, FETCH_ORG_TEAMS } from '../../organization/graphql';

export const useMatchDetailsInput = () => {
  const { orgId, teamId } = useCustomParams();
  const { loading: loadingSeasons, seasonOptions } = useSeasons();
  const [getTeamByOrg, { data: teams, loading: teamsLoading, error: teamsError }] =
    useLazyQuery(FETCH_ORG_TEAMS);

  const [getOrgById, { data: orgData, loading: orgLoading, error: orgError }] =
    useLazyQuery(FETCH_ORG);

  useEffect(() => {
    if (orgId) {
      getTeamByOrg({ variables: { orgId } });
      getOrgById({ variables: { orgId } });
    }
  }, [getOrgById, getTeamByOrg, orgId]);

  const loading = teamsLoading || loadingSeasons || orgLoading;
  const error = teamsError || orgError;

  // Track if data has been fetched (even if empty)
  const dataFetched = Boolean(teams) && Boolean(orgData);

  const opponents = useMemo(() => teams?.teams || [], [teams]);
  const competitions = useMemo(() => orgData?.org?.competitions || [], [orgData]);

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
    dataFetched,
    competitions,
    competitionOptions,
    loading,
    error,
  };
};
