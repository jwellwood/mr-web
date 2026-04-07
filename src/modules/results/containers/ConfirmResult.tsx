import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  CustomButton,
  CustomTypography,
  MutationError,
  SectionContainer,
} from '../../../components';
import { CustomGridContainer, CustomGridItem } from '../../../components/grids';
import { Spinner } from '../../../components/loaders';
import { FormModal } from '../../../components/modals';
import ConfirmationModal from '../../../components/modals/confirmation-modal/ConfirmationModal';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { FETCH_RESULT } from '../graphql';
import { CONFIRM_RESULT } from '../graphql/CONFIRM_RESULT';

export default function ConfirmResult() {
  const { t } = useTranslation('results');
  const [open, setOpen] = useState(false);
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
    <>
      {error ? (
        <MutationError error={error} />
      ) : loading ? (
        <Spinner />
      ) : (
        <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
          <CustomButton>{t('BUTTONS.CONFIRM')}</CustomButton>
        </span>
      )}
      <FormModal open={open} onClose={() => setOpen(false)} title={t('BUTTONS.CONFIRM')}>
        <SectionContainer>
          <CustomGridContainer direction="row" spacing={3}>
            <CustomGridItem size={12}>
              <CustomButton onClick={onConfirm} variant="contained" color="primary" fullWidth>
                {t('BUTTONS.CONFIRM')}
              </CustomButton>
            </CustomGridItem>
            <ConfirmationModal
              title={t('BUTTONS.DISPUTE')}
              loading={loading}
              onConfirm={onDispute}
              btn={
                <CustomTypography color="error" bold>
                  {t('BUTTONS.DISPUTE')}
                </CustomTypography>
              }
            >
              {t('MESSAGES.DISPUTE_RESULT')}
            </ConfirmationModal>
          </CustomGridContainer>
        </SectionContainer>
      </FormModal>
    </>
  );
}
