import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledSelectInput,
  ControlledSwitchInput,
} from '../../../../components';
import type { ISelectOptions } from '../../../../components';
import { positionOptions } from '../../../../constants';
import { TApolloError } from '../../../../types/apollo';
import { getNumberOptions } from '../../../../utils';
import AddMatchPlayerStatsSchema, { AddMatchPlayerStatsFormValues } from './schema';

interface Props {
  onSubmit: (data: AddMatchPlayerStatsFormValues) => void;
  defaultValues: AddMatchPlayerStatsFormValues;
  goalOptions: ISelectOptions[];
  concededOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function AddMatchPlayerStatsForm({
  onSubmit,
  defaultValues,
  goalOptions,
  concededOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('matches');
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
    reset,
  } = useForm<AddMatchPlayerStatsFormValues>({
    defaultValues,
    resolver: zodResolver(AddMatchPlayerStatsSchema),
  });

  const goalsScored = useWatch({ control, name: 'goals' });
  const goalsConceded = useWatch({ control, name: 'conceded' });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{
        text: t('FORM.BUTTONS.ADD'),
        disabled: !isValid || !isDirty,
        confirm: { show: false },
      }}
      loading={loading}
      error={error}
    >
      <ControlledSwitchInput
        control={control}
        name="isStarter"
        label={t('FORM.LABELS.IS_STARTER')}
      />
      <ControlledSelectInput
        control={control}
        name="matchPosition"
        label={t('FORM.LABELS.POSITION')}
        options={positionOptions}
      />
      <ControlledSelectInput
        control={control}
        name="goals"
        label={t('FORM.LABELS.GOALS')}
        options={goalOptions}
      />
      <ControlledSelectInput
        control={control}
        name="pensScored"
        label={t('FORM.LABELS.PENS_SCORED')}
        options={goalOptions}
        disabled={+goalsScored === 0}
      />
      <ControlledSelectInput
        control={control}
        name="assists"
        label={t('FORM.LABELS.ASSISTS')}
        options={goalOptions}
      />
      <ControlledSelectInput
        control={control}
        name="ownGoals"
        label={t('FORM.LABELS.OWN_GOALS')}
        options={concededOptions}
      />
      <ControlledSelectInput
        control={control}
        name="pensMissed"
        label={t('FORM.LABELS.PENS_MISSED')}
        options={getNumberOptions(10)}
      />
      <ControlledSelectInput
        control={control}
        name="pensSaved"
        label={t('FORM.LABELS.PENS_SAVED')}
        options={getNumberOptions(10)}
      />
      <ControlledSelectInput
        control={control}
        name="conceded"
        label={t('FORM.LABELS.CONCEDED')}
        options={concededOptions}
      />
      <ControlledSelectInput
        control={control}
        name="yellowCards"
        label={t('FORM.LABELS.YELLOW_CARDS')}
        options={getNumberOptions(2, 0)}
      />
      <ControlledSwitchInput control={control} name="mvp" label={t('FORM.LABELS.IS_MVP')} />
      <ControlledSwitchInput control={control} name="redCard" label={t('FORM.LABELS.RED_CARD')} />
      <ControlledSwitchInput
        control={control}
        name="cleanSheet"
        label={t('FORM.LABELS.CLEAN_SHEET')}
        disabled={+goalsConceded !== 0}
      />
    </FormContainer>
  );
}
