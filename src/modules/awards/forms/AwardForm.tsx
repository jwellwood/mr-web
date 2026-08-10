import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledTextInput,
  ControlledMultiSelectInput,
  type ISelectOptions,
} from '../../../components';
import { TApolloError } from '../../../types/apollo';
import { AwardSchema, requiredFields, type AwardFormData } from './schema';

interface Props {
  onSubmit: (data: AwardFormData) => void;
  defaultValues: AwardFormData;
  playersOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}
export default function AwardForm({
  onSubmit,
  defaultValues,
  playersOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('awards');
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    reset,
  } = useForm<AwardFormData>({
    defaultValues,
    resolver: zodResolver(AwardSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      loading={loading}
      error={error}
      submitBtn={{ disabled: !isDirty || !isValid }}
      formSummary={t('FORM.SUMMARY')}
    >
      <ControlledTextInput
        control={control}
        name="awardName"
        label={t('FORM.LABELS.AWARD_NAME')}
        placeholder={t('FORM.LABELS.AWARD_NAME_PLACEHOLDER')}
        required={requiredFields.awardName}
      />
      <ControlledMultiSelectInput
        control={control}
        name="winners"
        label={t('FORM.LABELS.WINNERS')}
        options={playersOptions}
        showLabels
        required={requiredFields.winners}
      />
      <ControlledTextInput
        control={control}
        name="awardValue"
        label={t('FORM.LABELS.VALUE')}
        required={requiredFields.awardValue}
        helperText={t('FORM.HELPERS.VALUE')}
      />
      <ControlledTextInput
        control={control}
        name="comment"
        label={t('FORM.LABELS.COMMENT')}
        required={requiredFields.comment}
      />
    </FormContainer>
  );
}
