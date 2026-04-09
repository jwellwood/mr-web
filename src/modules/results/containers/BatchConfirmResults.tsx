import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../../components';
import ConfirmationModal from '../../../components/modals/confirmation-modal/ConfirmationModal';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { BATCH_CONFIRM_RESULTS, FETCH_RESULTS } from '../graphql';

interface Props {
  resultIds: string[];
}

export default function BatchConfirmResults({ resultIds }: Props) {
  const { orgId, orgSeasonId } = useCustomParams();
  const { t } = useTranslation('results');
  const dispatch: AppDispatch = useDispatch();
  const [confirmResult, { loading }] = useMutation(BATCH_CONFIRM_RESULTS, {
    refetchQueries: [{ query: FETCH_RESULTS, variables: { orgId, orgSeasonId } }],
    onError: () => dispatch(showAlert({ text: t('ALERTS.CONFIRM_RESULTS.ERROR'), type: 'error' })),
  });

  const onConfirm = () => {
    confirmResult({
      variables: { orgId: orgId!, resultIds },
    })
      .then(() => {
        dispatch(showAlert({ text: t('ALERTS.CONFIRM_RESULTS.SUCCESS'), type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: t('ALERTS.CONFIRM_RESULTS.ERROR'), type: 'error' }));
      });
  };

  return (
    <ConfirmationModal
      loading={loading}
      onConfirm={onConfirm}
      title={t('BUTTONS.CONFIRM_RESULTS')}
      btn={
        <CustomButton color="tertiary" variant="text">
          {t('BUTTONS.CONFIRM_RESULTS')}
        </CustomButton>
      }
    >
      {t('MESSAGES.CONFIRM_RESULTS', { count: resultIds.length })}
    </ConfirmationModal>
  );
}
