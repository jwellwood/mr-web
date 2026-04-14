import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import type { CompetitionFormData } from '../forms/schema';
import { EDIT_COMPETITION, FETCH_COMPETITION, FETCH_COMPETITIONS } from '../graphql';
import { mapFormToEditCompetition, mapCompetitionToForm } from '../helpers/mapCompetitionForm';
import EditCompetitionPage from '../pages/EditCompetitionPage';

export default function EditCompetition() {
  const { t } = useTranslation('competitions');
  const { orgId, competitionId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, data } = useQuery(FETCH_COMPETITION, {
    variables: { compId: competitionId! },
  });

  const [updateCompetition, { loading: updateLoading }] = useMutation(EDIT_COMPETITION, {
    refetchQueries: [
      { query: FETCH_COMPETITION, variables: { compId: competitionId! } },
      { query: FETCH_COMPETITIONS, variables: { orgId: orgId! } },
    ],
    onError: () => dispatch(showAlert({ text: t('ALERTS.EDIT_COMPETITION.ERROR'), type: 'error' })),
  });

  const defaultValues: CompetitionFormData | null = useMemo(
    () => (data?.competition ? mapCompetitionToForm(data.competition) : null),
    [data]
  );

  const onSubmit = async (formData: CompetitionFormData) => {
    try {
      const variables = mapFormToEditCompetition(formData, orgId!, competitionId!);
      return updateCompetition({ variables }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.EDIT_COMPETITION.SUCCESS'), type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.EDIT_COMPETITION.ERROR'), type: 'error' }));
    }
  };

  return (
    <EditCompetitionPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={loading || updateLoading}
      error={error}
    />
  );
}
