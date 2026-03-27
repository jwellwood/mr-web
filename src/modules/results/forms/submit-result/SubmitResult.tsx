import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { FETCH_RESULT } from '../../graphql';
import { SUBMIT_RESULT } from '../../graphql/SUBMIT_RESULT';
import { submitResultInitialFormState } from './state';
import SubmitResultForm from './SubmitResultForm';
import { SubmitResultFormData } from './validation';

interface Props {
  homeTeamName?: string;
  awayTeamName?: string;
  homeGoals?: number;
  awayGoals?: number;
}

export default function SubmitResult({ homeTeamName, awayTeamName, homeGoals, awayGoals }: Props) {
  const { resultId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const [submitResult, { loading }] = useMutation(SUBMIT_RESULT, {
    refetchQueries: [{ query: FETCH_RESULT, variables: { resultId } }],
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
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
      homeTeamName={homeTeamName}
      awayTeamName={awayTeamName}
    />
  );
}
