import { useMutation } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { initialTeamSeasonState, SeasonFormData } from '../forms/schema';
import { ADD_SEASON, FETCH_SEASONS, FETCH_SEASONS_POSITION } from '../graphql';
import { mapSeasonForm } from '../helpers/mapSeasonForm';
import { useSeasonInput } from '../hooks/useSeasonInput';
import AddSeasonPage from '../pages/AddSeasonPage';

export default function AddTeamSeason() {
  const { t } = useTranslation('teamseasons');
  const { orgId, teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const defaultValues: SeasonFormData = useMemo(() => ({ ...initialTeamSeasonState }), []);

  const { competitionOptions, orgError, orgLoading } = useSeasonInput(orgId);

  const [addTeamSeason, { loading }] = useMutation(ADD_SEASON, {
    refetchQueries: [
      { query: FETCH_SEASONS_POSITION, variables: { teamId } },
      { query: FETCH_SEASONS, variables: { teamId } },
    ],
    onError: () => dispatch(showAlert({ text: t('ALERTS.ADD_SEASON.ERROR'), type: 'error' })),
  });

  const onSubmit = async (formData: SeasonFormData) => {
    try {
      return addTeamSeason({
        variables: {
          teamId: teamId!,
          ...mapSeasonForm.toVariables(formData),
        },
      }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.ADD_SEASON.SUCCESS'), type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.ADD_SEASON.ERROR'), type: 'error' }));
    }
  };

  return (
    <AddSeasonPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      competitionOptions={competitionOptions}
      loading={loading || orgLoading}
      error={orgError}
    />
  );
}
