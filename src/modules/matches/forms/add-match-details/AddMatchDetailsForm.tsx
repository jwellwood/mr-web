import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledDateInput,
  ControlledSelectInput,
  ControlledSwitchInput,
  type ISelectOptions,
  SectionContainer,
} from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { getNumberOptions } from '../../../../utils';
import AddMatchDetailsSchema, {
  AddMatchDetailsFormInput,
  AddMatchDetailsFormValues,
} from './schema';

interface Props {
  onSubmit: (data: AddMatchDetailsFormValues) => void;
  defaultValues: AddMatchDetailsFormValues;
  seasonOptions: ISelectOptions[];
  opponentOptions: ISelectOptions[];
  competitionOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function AddMatchDetailsForm({
  onSubmit,
  defaultValues,
  seasonOptions,
  opponentOptions,
  competitionOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('matches');
  const decisionOptions = [
    { label: '', value: '' },
    { label: t('FORM.OPTIONS.DECISION.EXTRA_TIME'), value: 'EXTRA_TIME' },
    { label: t('FORM.OPTIONS.DECISION.PENALTIES'), value: 'PENALTIES' },
  ];
  const winnerSideOptions = [
    { label: '', value: '' },
    { label: t('FORM.OPTIONS.WINNER_SIDE.HOME'), value: 'HOME' },
    { label: t('FORM.OPTIONS.WINNER_SIDE.AWAY'), value: 'AWAY' },
  ];
  const {
    handleSubmit,
    control,
    clearErrors,
    setValue,
    formState: { isValid },
    reset,
  } = useForm<AddMatchDetailsFormInput, unknown, AddMatchDetailsFormValues>({
    defaultValues,
    resolver: zodResolver(AddMatchDetailsSchema),
    mode: 'onChange',
  });

  const currentCompetitionId = useWatch({ control, name: 'competitionId' });
  const currentValues = useWatch({ control });
  const isCup = useMemo(
    () =>
      competitionOptions
        .find(option => String(option.value) === String(currentCompetitionId))
        ?.meta?.competitionType?.toString()
        .toLowerCase() === 'cup',
    [competitionOptions, currentCompetitionId]
  );
  const showCupOutcomeFields =
    isCup && String(currentValues.teamGoals) === String(currentValues.opponentGoals);

  useEffect(() => {
    if (showCupOutcomeFields) return;
    setValue('decision', undefined, { shouldDirty: false, shouldValidate: false });
    setValue('winnerSide', undefined, { shouldDirty: false, shouldValidate: false });
    clearErrors(['decision', 'winnerSide']);
  }, [clearErrors, setValue, showCupOutcomeFields]);

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{
        text: t('FORM.BUTTONS.NEXT'),
        disabled: !isValid,
        confirm: { show: false },
      }}
      loading={loading}
      error={error}
    >
      <ControlledDateInput
        control={control}
        name="date"
        label={t('FORM.LABELS.DATE')}
        disableFuture={false}
      />
      <ControlledSelectInput
        control={control}
        name="seasonId"
        label={t('FORM.LABELS.SEASON')}
        options={seasonOptions}
      />
      <ControlledSelectInput
        control={control}
        name="competitionId"
        label={t('FORM.LABELS.COMPETITION')}
        options={competitionOptions}
      />
      <ControlledSwitchInput control={control} name="isHome" label={t('FORM.LABELS.IS_HOME')} />

      <ControlledSelectInput
        control={control}
        name="opponentId"
        label={t('FORM.LABELS.OPPONENT')}
        options={opponentOptions}
      />

      <ControlledSelectInput
        control={control}
        name="teamGoals"
        label={t('FORM.LABELS.GOALS_SCORED')}
        options={getNumberOptions(99)}
      />
      <ControlledSelectInput
        control={control}
        name="opponentGoals"
        label={t('FORM.LABELS.GOALS_CONCEDED')}
        options={getNumberOptions(99)}
      />
      <SectionContainer type="info">
        <ControlledSwitchInput
          control={control}
          name="isForfeit"
          label={t('FORM.LABELS.IS_FORFEIT')}
        />
        {showCupOutcomeFields ? (
          <>
            <ControlledSelectInput
              control={control}
              name="decision"
              label={t('FORM.LABELS.DECISION')}
              options={decisionOptions}
            />
            <ControlledSelectInput
              control={control}
              name="winnerSide"
              label={t('FORM.LABELS.WINNER_SIDE')}
              options={winnerSideOptions}
            />
          </>
        ) : null}
      </SectionContainer>
    </FormContainer>
  );
}
