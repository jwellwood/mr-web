import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { useCompetitionOptions } from '../../competitions/hooks/useCompetitionOptions';
import { useOrgSeasonOptions } from '../../seasons/hooks/useOrgSeasonOptions';
import { initialResultState, ResultFormData } from '../forms/result/schema';
import { ADD_RESULT, FETCH_FIXTURES, FETCH_RESULTS } from '../graphql';
import { mapFormToAddResult } from '../helpers/mapResultForm';
import { useTeamOptions } from '../hooks/useResultInput';
import AddResultPage from '../pages/AddResultPage';

export default function AddResult() {
  const { t } = useTranslation('results');
  const { orgId, orgSeasonId } = useCustomParams();
  const { teamOptions, loading: teamsLoading } = useTeamOptions();
  const { competitionOptions, loading: competitionsLoading } = useCompetitionOptions();
  const { orgSeasonOptions, loading: orgSeasonsLoading } = useOrgSeasonOptions();

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues] = useState<ResultFormData>({
    ...initialResultState,
    orgSeasonId: orgSeasonId || initialResultState.orgSeasonId,
  });

  const [addResult, { loading }] = useMutation(ADD_RESULT, {
    refetchQueries: [
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId: orgSeasonId || 'default' } },
      { query: FETCH_FIXTURES, variables: { orgId, orgSeasonId: orgSeasonId || 'default' } },
    ],
    onError: () => dispatch(showAlert({ text: t('ALERTS.ADD.ERROR'), type: 'error' })),
  });

  const onSubmit = async (formData: ResultFormData) => {
    try {
      const variables = mapFormToAddResult(formData, orgId!, orgSeasonId);
      return addResult({
        variables,
      }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.ADD.SUCCESS'), type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.ADD.ERROR'), type: 'error' }));
    }
  };

  const isLoading = loading || teamsLoading || orgSeasonsLoading || competitionsLoading;

  return (
    <AddResultPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={isLoading}
      teamOptions={teamOptions}
      competitionOptions={competitionOptions}
      orgSeasonOptions={orgSeasonOptions}
    />
  );
}
