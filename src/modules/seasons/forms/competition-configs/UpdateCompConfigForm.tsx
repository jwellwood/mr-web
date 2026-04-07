import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../../../components';
import { FormContainer } from '../../../../components/forms';
import { ControlledSelectInput, ControlledMultiSelectInput } from '../../../../components/inputs';
import { FormModal } from '../../../../components/modals';
import { getNumberOptions } from '../../../../utils';
import { UpdateCompConfigSchema, type UpdateCompConfigFormData } from './schema';

interface Props {
  onSubmit: (formData: UpdateCompConfigFormData) => void;
  defaultValues: UpdateCompConfigFormData;
  loading: boolean;
  numberOfTeams: number;
  numberOfCompetitions: number;
}

export default function UpdateCompConfigForm({
  onSubmit,
  defaultValues,
  numberOfTeams,
  numberOfCompetitions,
  loading,
}: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('seasons');

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
    reset,
  } = useForm<UpdateCompConfigFormData>({
    defaultValues,
    resolver: zodResolver(UpdateCompConfigSchema),
    mode: 'onChange',
  });

  const submitHandler = (data: UpdateCompConfigFormData) => {
    onSubmit(data);
    setOpen(false);
  };

  return (
    <>
      <CustomButton onClick={() => setOpen(true)} variant="text">
        {t('CONFIG.EDIT')}
      </CustomButton>
      <FormModal open={open} onClose={() => setOpen(false)}>
        <FormContainer
          onSubmit={handleSubmit(submitHandler)}
          loading={loading}
          submitBtn={{
            disabled: !isValid || !isDirty,
            text: t('CONFIG.SUBMIT'),
            confirm: { show: false },
          }}
          onReset={() => reset(defaultValues)}
        >
          <ControlledSelectInput
            control={control}
            name="rounds"
            label={t('CONFIG.ROUNDS')}
            options={getNumberOptions(50, 0)}
          />
          <ControlledMultiSelectInput
            control={control}
            name="splitIndexes"
            label={t('CONFIG.SPLIT_FORM')}
            options={getNumberOptions(numberOfTeams, 0)}
            showLabels
          />
          <ControlledMultiSelectInput
            control={control}
            name="promotionPositions"
            label={t('CONFIG.PROMOTION_FORM')}
            options={getNumberOptions(numberOfTeams, 1)}
          />
          <ControlledMultiSelectInput
            control={control}
            name="relegationPositions"
            label={t('CONFIG.RELEGATION_FORM')}
            options={getNumberOptions(numberOfTeams, 1)}
          />
          <ControlledSelectInput
            control={control}
            name="priority"
            label={t('CONFIG.PRIORITY')}
            options={getNumberOptions(numberOfCompetitions, 1)}
          />
        </FormContainer>
      </FormModal>
    </>
  );
}
