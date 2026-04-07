import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { SubmitResultFormData, submitResultInitialFormState } from '../forms/submit-result/schema';
import SubmitResultForm from '../forms/submit-result/SubmitResultForm';
import { FETCH_RESULT } from '../graphql';
import { SUBMIT_RESULT } from '../graphql/SUBMIT_RESULT';

interface Props {
  homeTeamName?: string;
  awayTeamName?: string;
  homeGoals?: number;
  awayGoals?: number;
}

export default function SubmitResult({ homeTeamName, awayTeamName, homeGoals, awayGoals }: Props) {
  const { t } = useTranslation('results');
  const { resultId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const [submitResult, { loading }] = useMutation(SUBMIT_RESULT, {
    refetchQueries: [{ query: FETCH_RESULT, variables: { resultId } }],
    onError: () => dispatch(showAlert({ text: t('ALERTS.SUBMIT_RESULT.ERROR'), type: 'error' })),
  });
  const [defaultValues] = useState<SubmitResultFormData>({
    ...submitResultInitialFormState,
    homeGoals,
    awayGoals,
  });
  const onSubmit = async (formData: SubmitResultFormData) => {
    try {
      const variables = {
        resultId,
        ...formData,
      };
      return submitResult({
        variables,
      }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.SUBMIT_RESULT.SUCCESS'), type: 'success' }));
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.SUBMIT_RESULT.ERROR'), type: 'error' }));
    }
  };

  return (
    <SubmitResultForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={loading}
      homeTeamName={homeTeamName}
      awayTeamName={awayTeamName}
    />
  );
}
