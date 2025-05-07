import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import { PAGES } from '../constants';
import SeasonForm from '../forms/SeasonForm';
import { DELETE_SEASON } from '../graphql/deleteSeason.graphql';
import { EDIT_SEASON } from '../graphql/editSeason.graphql';
import { GET_TEAM_SEASON_BY_ID } from '../graphql/getTeamSeasonById.graphql';
import { GET_TEAM_SEASONS } from '../graphql/getTeamSeasons.graphql';
import { GET_TROPHIES } from '../graphql/getTrophies.graphql';
import { useSeasonInput } from '../hooks/useSeasonInput';
import { ITeamSeason } from '../types';

const EditSeason: React.FC = () => {
  const { teamId, seasonId, orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] =
    useState<Partial<ITeamSeason>>(null);
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

  const { competitionOptions, orgError, orgLoading } = useSeasonInput(orgId);

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
        dispatch(showAlert('Season deleted successfully', 'success'));
        navigate(-2);
      });
    } catch (error) {
      dispatch(showAlert('There was a problem', 'error'));
    }
  };

  const onSubmit = async (formData: Partial<ITeamSeason>) => {
    try {
      return editSeason({
        variables: {
          teamId,
          seasonId,
          ...formData,
          leaguePosition: +formData.leaguePosition,
        },
      }).then(() => {
        refetch();
        dispatch(showAlert('Season updated successfully', 'success'));
        navigate(-2);
      });
    } catch (error) {
      dispatch(showAlert('There was a problem', 'error'));
    }
  };

  if (error || editError || deleteError || orgError) {
    return <ErrorGraphql error={[error, editError, deleteError, orgError]} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
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
