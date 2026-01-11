import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApolloError, useMutation, useQuery } from '@apollo/client';

import {
  DELETE_SEASON,
  EDIT_SEASON,
  FETCH_SEASONS_POSITION,
  FETCH_SEASON,
  FETCH_SEASONS,
  FETCH_TROPHIES,
} from '../graphql';

import { useSeasonInput } from '../hooks/useSeasonInput.ts';
import { ITeamSeasonInput } from '../types';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { AppDispatch } from '../../../store/store.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AUTH_ROLES } from '../../../constants';
import { Spinner } from '../../../components/loaders';
import { PAGES } from '../constants';
import { mapFormDataToSeason, mapSeasonToFormData } from './seasons.mapper.ts';
import SeasonForm from './components/SeasonForm.tsx';
import { DataError, PageHeader } from '../../../components';

export default function EditSeason() {
  const { teamId, seasonId, orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<ITeamSeasonInput | null>(null);
  const { loading, error, data, refetch } = useQuery(FETCH_SEASON, {
    variables: { seasonId },
    notifyOnNetworkStatusChange: true,
  });

  const [editSeason, { error: editError, loading: editLoading }] = useMutation(EDIT_SEASON, {
    refetchQueries: [
      { query: FETCH_SEASONS, variables: { teamId } },
      { query: FETCH_SEASONS_POSITION, variables: { teamId } },
    ],
  });

  const { competitionOptions, orgError, orgLoading } = useSeasonInput(orgId);

  const [deleteSeason, { error: deleteError, loading: deleteLoading }] = useMutation(
    DELETE_SEASON,
    {
      refetchQueries: [
        { query: FETCH_TROPHIES, variables: { teamId } },
        { query: FETCH_SEASONS_POSITION, variables: { teamId } },
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

  const renderContent = () => {
    return !isLoading && defaultValues ? (
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
  };
  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_SEASON}>
        {hasError ? (
          <DataError error={(error || editError || deleteError || orgError) as ApolloError} />
        ) : (
          renderContent()
        )}
      </PageHeader>
    </RouteGuard>
  );
}
