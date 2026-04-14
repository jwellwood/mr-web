import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ControlledSelectInput,
  ControlledSwitchInput,
  CustomButton,
  FormContainer,
} from '../../../../components';
import { FormModal } from '../../../../components/modals';
import { getNumberOptions } from '../../../../utils';
import { type SubmitResultFormData, SubmitResultSchema } from './schema';

interface Props {
  onSubmit: (formData: SubmitResultFormData) => void;
  defaultValues: SubmitResultFormData;
  loading: boolean;
  homeTeamName?: string;
  awayTeamName?: string;
}

export default function SubmitResultForm({
  onSubmit,
  defaultValues,
  loading,
  homeTeamName,
  awayTeamName,
}: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('results');
  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm<SubmitResultFormData>({
    defaultValues,
    resolver: zodResolver(SubmitResultSchema),
    mode: 'onChange',
  });

  const submitHandler = (data: SubmitResultFormData) => {
    onSubmit(data);
    setOpen(false);
  };

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
        <CustomButton>{t('BUTTONS.SUBMIT_RESULT')}</CustomButton>
      </span>
      <FormModal open={open} onClose={() => setOpen(false)} title={t('BUTTONS.SUBMIT_RESULT')}>
        <FormContainer
          onSubmit={handleSubmit(submitHandler)}
          onReset={() => reset(defaultValues)}
          submitBtn={{ disabled: !isValid }}
          loading={loading}
        >
          <ControlledSelectInput
            control={control}
            name="homeGoals"
            label={`${homeTeamName} ${t('FORM.LABELS.GOALS')}`}
            options={getNumberOptions(99, 0)}
          />
          <ControlledSelectInput
            control={control}
            name="awayGoals"
            label={`${awayTeamName} ${t('FORM.LABELS.GOALS')}`}
            options={getNumberOptions(99, 0)}
          />
          <ControlledSwitchInput
            control={control}
            name="isForfeit"
            label={t('FORM.LABELS.FORFEIT')}
          />
        </FormContainer>
      </FormModal>
    </>
  );
}
