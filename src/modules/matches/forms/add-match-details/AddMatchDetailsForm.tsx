import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledDateInput,
  ControlledSelectInput,
  ControlledSwitchInput,
  type ISelectOptions,
} from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { getNumberOptions } from '../../../../utils';
import AddMatchDetailsSchema, { AddMatchDetailsFormValues } from './schema';

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
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
    reset,
  } = useForm<AddMatchDetailsFormValues>({
    defaultValues,
    resolver: zodResolver(AddMatchDetailsSchema),
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{ text: t('FORM.NEXT'), disabled: !isValid || !isDirty, confirm: { show: false } }}
      loading={loading}
      error={error}
    >
      <ControlledDateInput
        control={control}
        name="date"
        label={t('FORM.DATE')}
        disableFuture={false}
      />
      <ControlledSwitchInput control={control} name="isHome" label={t('FORM.IS_HOME')} />
      <ControlledSwitchInput control={control} name="isForfeit" label={t('FORM.IS_FORFEIT')} />
      <ControlledSelectInput
        control={control}
        name="opponentId"
        label={t('FORM.OPPONENT')}
        options={opponentOptions}
      />
      <ControlledSelectInput
        control={control}
        name="competitionId"
        label={t('FORM.COMPETITION')}
        options={competitionOptions}
      />
      <ControlledSelectInput
        control={control}
        name="seasonId"
        label={t('FORM.SEASON')}
        options={seasonOptions}
      />
      <ControlledSelectInput
        control={control}
        name="teamGoals"
        label={t('FORM.GOALS_SCORED')}
        options={getNumberOptions(99)}
      />
      <ControlledSelectInput
        control={control}
        name="opponentGoals"
        label={t('FORM.GOALS_CONCEDED')}
        options={getNumberOptions(99)}
      />
    </FormContainer>
  );
}
