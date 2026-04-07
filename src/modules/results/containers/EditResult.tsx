import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { useCompetitionOptions } from '../../competitions/hooks/useCompetitionOptions';
import { useOrgSeasonOptions } from '../../seasons/hooks/useOrgSeasonOptions';
import { ResultFormData } from '../forms/result/schema';
import { EDIT_RESULT, FETCH_LEAGUE_TABLES, FETCH_RESULT, FETCH_RESULTS } from '../graphql';
import { mapFormToEditResult, mapResultToForm } from '../helpers/mapResultForm';
import { useTeamOptions } from '../hooks/useResultInput';
import EditResultPage from '../pages/EditResultPage';

export default function EditResult() {
  const { t } = useTranslation('results');
  const { orgId, orgSeasonId, resultId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { teamOptions, loading: teamsLoading } = useTeamOptions();
  const { competitionOptions, loading: competitionsLoading } = useCompetitionOptions();
  const { orgSeasonOptions, loading: orgSeasonsLoading } = useOrgSeasonOptions();
  const { loading, error, data } = useQuery(FETCH_RESULT, {
    variables: { resultId: resultId! },
  });

  const defaultValues: ResultFormData | null = useMemo(() => {
    if (!data?.result) return null;
    return mapResultToForm(data.result);
  }, [data]);

  const [editResult, { loading: editLoading }] = useMutation(EDIT_RESULT, {
    refetchQueries: [
      { query: FETCH_RESULT, variables: { resultId: resultId! } },
      { query: FETCH_RESULTS, variables: { orgId: orgId!, orgSeasonId: orgSeasonId! } },
      { query: FETCH_LEAGUE_TABLES, variables: { orgId: orgId!, orgSeasonId: orgSeasonId! } },
    ],
    onError: () => dispatch(showAlert({ text: t('ALERTS.EDIT.ERROR'), type: 'error' })),
  });

  const onSubmit = async (formData: ResultFormData) => {
    try {
      const variables = mapFormToEditResult(formData, orgId!, resultId!);

      return editResult({ variables }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.EDIT.SUCCESS'), type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.EDIT.ERROR'), type: 'error' }));
    }
  };

  const isLoading =
    loading || editLoading || teamsLoading || competitionsLoading || orgSeasonsLoading;

  return (
    <EditResultPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={isLoading}
      error={error}
      teamOptions={teamOptions}
      competitionOptions={competitionOptions}
      orgSeasonOptions={orgSeasonOptions}
    />
  );
}
