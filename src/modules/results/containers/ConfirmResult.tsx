import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import ConfirmResultView from '../components/ConfirmResultView';
import { FETCH_RESULT } from '../graphql';
import { CONFIRM_RESULT } from '../graphql/CONFIRM_RESULT';

export default function ConfirmResult() {
  const { t } = useTranslation('results');
  const { resultId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const [confirmResult, { loading, error }] = useMutation(CONFIRM_RESULT, {
    onError: () => dispatch(showAlert({ text: t('ALERTS.CONFIRM_RESULT.ERROR'), type: 'error' })),
  });

  const onConfirm = () => {
    confirmResult({
      variables: { resultId, isConfirmed: true },
      refetchQueries: [{ query: FETCH_RESULT, variables: { resultId } }],
    }).then(() => {
      dispatch(showAlert({ text: t('ALERTS.CONFIRM_RESULT.SUCCESS'), type: 'success' }));
    });
  };
  const onDispute = () => {
    confirmResult({
      variables: { resultId, isConfirmed: false },
      refetchQueries: [{ query: FETCH_RESULT, variables: { resultId } }],
    }).then(() => {
      dispatch(showAlert({ text: t('ALERTS.DISPUTE_RESULT.SUCCESS'), type: 'success' }));
    });
  };

  return (
    <ConfirmResultView
      onConfirm={onConfirm}
      onDispute={onDispute}
      loading={loading}
      error={error}
    />
  );
}
