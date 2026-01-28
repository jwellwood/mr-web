import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import {
  DELETE_SEASON,
  EDIT_SEASON,
  FETCH_SEASONS_POSITION,
  FETCH_SEASON,
  FETCH_SEASONS,
  FETCH_TROPHIES,
} from '../../graphql';
import { useSeasonInput } from '../../hooks/useSeasonInput';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import RouteGuard from '../../../../router/RouteGuard';
import { AUTH_ROLES } from '../../../../constants';
import { Spinner } from '../../../../components/loaders';
import { PAGES } from '../../constants';
import SeasonForm from './SeasonForm';
import { mapSeasonForm } from '../../helpers/mapSeasonForm';
import { PageHeader } from '../../../../components';
import type { SeasonFormData } from './validation';

export default function EditSeason() {
  const { teamId, seasonId, orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<SeasonFormData | null>(null);
  const { loading, error, data, refetch } = useQuery(FETCH_SEASON, {
    variables: { seasonId: seasonId! },
    notifyOnNetworkStatusChange: true,
  });

  const [editSeason, { error: editError, loading: editLoading }] = useMutation(EDIT_SEASON, {
    refetchQueries: [
      { query: FETCH_SEASONS, variables: { teamId: teamId! } },
      { query: FETCH_SEASONS_POSITION, variables: { teamId: teamId! } },
    ],
  });

  const { competitionOptions, orgError, orgLoading } = useSeasonInput(orgId);

  const [deleteSeason, { error: deleteError, loading: deleteLoading }] = useMutation(
    DELETE_SEASON,
    {
      refetchQueries: [
        { query: FETCH_TROPHIES, variables: { teamId: teamId! } },
        { query: FETCH_SEASONS_POSITION, variables: { teamId: teamId! } },
      ],
    }
  );

  useEffect(() => {
    setDefaultValues(mapSeasonForm.toForm(data?.season));
  }, [data]);

  const onDelete = async () => {
    try {
      return deleteSeason({ variables: { teamId: teamId!, seasonId: seasonId! } }).then(() => {
        dispatch(showAlert({ text: 'Season deleted successfully', type: 'success' }));
        navigate(-2);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const onSubmit = async (formData: SeasonFormData) => {
    try {
      const variables = mapSeasonForm.toVariables(formData);
      return editSeason({ variables: { teamId: teamId!, seasonId: seasonId!, ...variables } }).then(
        () => {
          refetch();
          dispatch(showAlert({ text: 'Season updated successfully', type: 'success' }));
          navigate(-2);
        }
      );
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const isLoading = loading || orgLoading || editLoading || deleteLoading;

  const renderContent = () => {
    return defaultValues ? (
      <SeasonForm
        competitionOptions={competitionOptions}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={isLoading}
        error={error || editError || orgError || deleteError}
      />
    ) : (
      <Spinner />
    );
  };
  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_SEASON}>{renderContent()}</PageHeader>
    </RouteGuard>
  );
}
