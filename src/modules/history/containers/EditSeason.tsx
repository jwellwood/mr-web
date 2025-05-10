import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { DELETE_SEASON } from '../graphql/deleteSeason.graphql';
import { EDIT_SEASON } from '../graphql/editSeason.graphql';
import { GET_TEAM_SEASON_BY_ID } from '../graphql/getTeamSeasonById.graphql';
import { GET_TEAM_SEASONS } from '../graphql/getTeamSeasons.graphql';
import { GET_TROPHIES } from '../graphql/getTrophies.graphql';
import { useSeasonInput } from '../hooks/useSeasonInput';
import { ITeamSeason } from '../types';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import {showAlert} from "../../../store/features/alerts/alertsSlice.ts";
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import {AuthRoles} from "../../../constants.ts";
import {Spinner} from "../../../components/loaders";
import SeasonForm from '../forms/SeasonForm.tsx';
import PageHeader from '../../../components/typography/PageHeader.tsx';
import {PAGES} from "../constants.ts";

function EditSeason() {
  const { teamId, seasonId, orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] =
    useState<Partial<ITeamSeason>>({});
  const { loading, error, data, refetch } = useQuery(GET_TEAM_SEASON_BY_ID, {
    variables: { seasonId },
    notifyOnNetworkStatusChange: true,
  });

  const [editSeason, { error: editError, loading: editLoading }] = useMutation(
    EDIT_SEASON,
    {
      refetchQueries: [{ query: GET_TEAM_SEASONS, variables: { teamId } }],
    }
  );

  const { competitionOptions, orgError, orgLoading } = useSeasonInput(orgId as string);

  const [deleteSeason, { error: deleteError, loading: deleteLoading }] =
    useMutation(DELETE_SEASON, {
      refetchQueries: [{ query: GET_TROPHIES, variables: { teamId } }],
    });

  useEffect(() => {
    if (data) {
      const { season } = data;
      setDefaultValues({
        ...(season as Partial<ITeamSeason>),
      });
    }
  }, [data]);

  const onDelete = async () => {
    try {
      return deleteSeason({ variables: { teamId, seasonId } }).then(() => {
        dispatch(showAlert({text: 'Season deleted successfully', type: 'success'}));
        navigate(-2);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({text: 'There was a problem', type: 'error'}));
    }
  };

  const onSubmit = async (formData: Partial<ITeamSeason>) => {
    try {
      return editSeason({
        variables: {
          teamId,
          seasonId,
          ...formData,
          leaguePosition: +(formData.leaguePosition || 0),
        },
      }).then(() => {
        refetch();
        dispatch(showAlert({text: 'Season updated successfully', type: 'success'}));
        navigate(-2);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({text: 'There was a problem', type: 'error'}));
    }
  };

  if (error || editError || deleteError || orgError) {
    return <ErrorGraphql error={(error || editError || deleteError || orgError) as Error} />;
  }

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_SEASON} />
      {!loading && !orgLoading && !editLoading && defaultValues ? (
        <SeasonForm
          competitionOptions={competitionOptions}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          onDelete={onDelete}
          deleteLoading={deleteLoading}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default EditSeason;
