import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { SUBMIT_RESULT } from '../../graphql/SUBMIT_RESULT';
import { submitResultInitialFormState } from './state';
import SubmitResultForm from './SubmitResultForm';
import { SubmitResultFormData } from './validation';

interface Props {
  homeTeamName?: string;
  awayTeamName?: string;
}

export default function SubmitResult({ homeTeamName, awayTeamName }: Props) {
  const { resultId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const [submitResult, { loading, error }] = useMutation(SUBMIT_RESULT);
  const [defaultValues] = useState<SubmitResultFormData>(submitResultInitialFormState);
  const onSubmit = async (formData: SubmitResultFormData) => {
    try {
      const variables = {
        resultId,
        isForfeit: formData.isForfeit,
        homeGoals: formData.homeGoals,
        awayGoals: formData.awayGoals,
      };
      return submitResult({
        variables,
      }).then(() => {
        dispatch(showAlert({ text: 'Result submitted successfully!', type: 'success' }));
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
    }
  };

  return (
    <SubmitResultForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={loading}
      error={error}
      homeTeamName={homeTeamName}
      awayTeamName={awayTeamName}
    />
  );
}
