import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import type { SeasonFormData } from '../forms/schema';
import { EDIT_SEASON, FETCH_SEASONS_POSITION, FETCH_SEASON, FETCH_SEASONS } from '../graphql';
import { mapSeasonForm } from '../helpers/mapSeasonForm';
import { useSeasonInput } from '../hooks/useSeasonInput';
import EditSeasonPage from '../pages/EditSeasonPage';

export default function EditSeason() {
  const { t } = useTranslation('teamseasons');
  const { teamId, seasonId, orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, data, refetch } = useQuery(FETCH_SEASON, {
    variables: { seasonId: seasonId! },
  });

  const [editSeason, { loading: editLoading }] = useMutation(EDIT_SEASON, {
    refetchQueries: [
      { query: FETCH_SEASONS, variables: { teamId: teamId! } },
      { query: FETCH_SEASONS_POSITION, variables: { teamId: teamId! } },
    ],
    onError: () => dispatch(showAlert({ text: t('ALERTS.EDIT_SEASON.ERROR'), type: 'error' })),
  });

  const { competitionOptions, orgSeasonOptions, orgError, orgLoading } = useSeasonInput(orgId);

  const defaultValues: SeasonFormData | null = useMemo(
    () => (data?.season ? mapSeasonForm.toForm(data.season) : null),
    [data]
  );

  const onSubmit = async (formData: SeasonFormData) => {
    try {
      const variables = mapSeasonForm.toVariables(formData);
      return editSeason({ variables: { teamId: teamId!, seasonId: seasonId!, ...variables } }).then(
        () => {
          refetch();
          dispatch(showAlert({ text: t('ALERTS.EDIT_SEASON.SUCCESS'), type: 'success' }));
          navigate(-2);
        }
      );
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.EDIT_SEASON.ERROR'), type: 'error' }));
    }
  };

  return (
    <EditSeasonPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      competitionOptions={competitionOptions}
      orgSeasonOptions={orgSeasonOptions}
      loading={loading || orgLoading || editLoading}
      error={error || orgError}
    />
  );
}
