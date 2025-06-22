import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  DELETE_SEASON,
  EDIT_SEASON,
  GET_POSITION_FINISHES,
  GET_TEAM_SEASON_BY_ID,
  GET_TEAM_SEASONS,
} from '../graphql/season';
import { GET_TROPHIES } from '../graphql/trophy';
import { useSeasonInput } from '../hooks/useSeasonInput';
import { ITeamSeasonInput } from '../types';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { Spinner } from '../../../components/loaders';
import SeasonForm from '../forms/SeasonForm.tsx';
import PageHeader from '../../../components/typography/PageHeader.tsx';
import { PAGES } from '../constants.ts';
import { mapFormDataToSeason, mapSeasonToFormData } from '../mappers/seasons.mapper.ts';

function EditSeason() {
  const { teamId, seasonId, orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<ITeamSeasonInput | null>(null);
  const { loading, error, data, refetch } = useQuery(GET_TEAM_SEASON_BY_ID, {
    variables: { seasonId },
    notifyOnNetworkStatusChange: true,
  });

  const [editSeason, { error: editError, loading: editLoading }] = useMutation(EDIT_SEASON, {
    refetchQueries: [
      { query: GET_TEAM_SEASONS, variables: { teamId } },
      { query: GET_POSITION_FINISHES, variables: { teamId } },
    ],
  });

  const { competitionOptions, orgError, orgLoading } = useSeasonInput(orgId);

  const [deleteSeason, { error: deleteError, loading: deleteLoading }] = useMutation(
    DELETE_SEASON,
    {
      refetchQueries: [
        { query: GET_TROPHIES, variables: { teamId } },
        { query: GET_POSITION_FINISHES, variables: { teamId } },
      ],
    }
  );

  useEffect(() => {
    if (data) {
      const { season } = data;
      setDefaultValues({
        ...mapSeasonToFormData(season),
      });
    }
  }, [data]);

  const onDelete = async () => {
    try {
      return deleteSeason({ variables: { teamId, seasonId } }).then(() => {
        dispatch(showAlert({ text: 'Season deleted successfully', type: 'success' }));
        navigate(-2);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const onSubmit = async (formData: ITeamSeasonInput) => {
    try {
      return editSeason({
        variables: {
          teamId,
          seasonId,
          ...mapFormDataToSeason(formData),
        },
      }).then(() => {
        refetch();
        dispatch(showAlert({ text: 'Season updated successfully', type: 'success' }));
        navigate(-2);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const hasError = error || editError || deleteError || orgError;
  const isLoading = loading && orgLoading && editLoading;

  const children = hasError ? (
    <ErrorGraphql error={(error || editError || deleteError || orgError) as Error} />
  ) : !isLoading && defaultValues ? (
    <SeasonForm
      competitionOptions={competitionOptions}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      onDelete={onDelete}
      deleteLoading={deleteLoading}
    />
  ) : (
    <Spinner />
  );

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_SEASON} />
      {children}
    </RouteGuard>
  );
}

export default EditSeason;
