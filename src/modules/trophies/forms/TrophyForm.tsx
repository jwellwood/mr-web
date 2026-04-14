import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledSelectInput,
  ControlledTextInput,
  ControlledSwitchInput,
  type ISelectOptions,
  ControlledDateInput,
} from '../../../components';
import { TApolloError } from '../../../types/apollo';
import { TrophySchema, type TrophyFormData } from './schema';

interface Props {
  onSubmit: (data: TrophyFormData) => void;
  defaultValues: TrophyFormData;
  seasonOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function TrophyForm({
  onSubmit,
  defaultValues,
  seasonOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('trophies');
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    reset,
  } = useForm<TrophyFormData>({
    defaultValues,
    resolver: zodResolver(TrophySchema),
    mode: 'onChange',
  });

  const isFinal = useWatch({ control, name: 'isFinal' });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{ disabled: !isValid || !isDirty }}
      loading={loading}
      error={error}
    >
      <ControlledTextInput control={control} name="name" label={t('FORM.LABELS.NAME')} />
      <ControlledSelectInput
        control={control}
        name="seasonId"
        label={t('FORM.LABELS.SEASON')}
        options={seasonOptions}
      />
      <ControlledDateInput
        control={control}
        name="year"
        label={t('FORM.LABELS.YEAR')}
        view="year"
      />
      <ControlledSwitchInput control={control} label={t('FORM.LABELS.IS_WINNER')} name="isWinner" />
      <ControlledSwitchInput control={control} label={t('FORM.LABELS.IS_FINAL')} name="isFinal" />
      {isFinal && (
        <ControlledTextInput control={control} name="opponent" label={t('FORM.LABELS.OPPONENT')} />
      )}
      <ControlledTextInput
        control={control}
        name="comment"
        label={t('FORM.LABELS.COMMENT')}
        multiline
      />
    </FormContainer>
  );
}
