import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { TApolloError } from '../../../types/apollo';

interface Props {
  onConfirm: () => void;
  onDispute: () => void;
  loading: boolean;
  error?: TApolloError;
}

export default function ConfirmResultView({ onConfirm, onDispute, loading, error }: Props) {
  const { t } = useTranslation('results');
  const [open, setOpen] = useState(false);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
          <CustomButton color="tertiary">{t('BUTTONS.CONFIRM')}</CustomButton>
        </span>
      )}
      <FormModal open={open} onClose={() => setOpen(false)} title={t('BUTTONS.CONFIRM')}>
        <SectionContainer>
          {error ? (
            <MutationError error={error} />
          ) : (
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
          )}
        </SectionContainer>
      </FormModal>
    </>
  );
}
