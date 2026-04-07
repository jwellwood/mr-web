import { zodResolver } from '@hookform/resolvers/zod';
import { isFuture } from 'date-fns';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ControlledDateInput,
  ControlledSelectInput,
  ControlledSwitchInput,
  FormContainer,
  ISelectOptions,
} from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { getNumberOptions } from '../../../../utils';
import ResultConfirmation from '../../components/ResultConfirmation';
import { getKickoffTimeOptions } from '../../helpers/getKickoffTimeOptions';
import type { ResultFormData } from './schema';
import { ResultSchema } from './schema';

interface Props {
  onSubmit: (formData: ResultFormData) => void;
  competitionOptions: ISelectOptions[];
  teamOptions: ISelectOptions[];
  orgSeasonOptions: ISelectOptions[];
  defaultValues: ResultFormData;
  loading: boolean;
  error?: TApolloError;
}

export default function ResultForm({
  onSubmit,
  defaultValues,
  competitionOptions,
  teamOptions,
  orgSeasonOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('results');
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    reset,
  } = useForm<ResultFormData>({
    defaultValues,
    resolver: zodResolver(ResultSchema),
    mode: 'onChange',
  });

  const currentDate = useWatch({ control, name: 'date' });
  const currentValues = useWatch({ control });
  const isFutureMatch = isFuture(new Date(currentDate));

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{
        disabled: !isValid || !isDirty,
        confirm: {
          show: true,
          content: (
            <ResultConfirmation
              result={currentValues as ResultFormData}
              teamOptions={teamOptions}
            />
          ),
        },
      }}
      loading={loading}
      error={error}
    >
      <ControlledDateInput
        control={control}
        name="date"
        label={t('FORMS.DATE')}
        disableFuture={false}
      />
      <ControlledSelectInput
        control={control}
        name="kickoffTime"
        label={t('FORMS.KICKOFF_TIME')}
        options={getKickoffTimeOptions()}
      />
      <ControlledSelectInput
        control={control}
        name="orgSeasonId"
        label={t('FORMS.SEASON')}
        options={orgSeasonOptions}
      />
      <ControlledSelectInput
        control={control}
        name="gameWeek"
        label={t('FORMS.GAME_WEEK')}
        options={getNumberOptions(52, 0)}
      />
      <ControlledSelectInput
        control={control}
        name="competitionId"
        label={t('FORMS.COMPETITION')}
        options={competitionOptions}
      />
      <ControlledSelectInput
        control={control}
        name="homeTeam"
        label={t('FORMS.HOME_TEAM')}
        options={teamOptions}
      />
      {!isFutureMatch && (
        <ControlledSelectInput
          control={control}
          name="homeGoals"
          label={t('FORMS.HOME_SCORE')}
          options={getNumberOptions(50, 0)}
        />
      )}
      <ControlledSelectInput
        control={control}
        name="awayTeam"
        label={t('FORMS.AWAY_TEAM')}
        options={teamOptions}
      />
      {!isFutureMatch && (
        <ControlledSelectInput
          control={control}
          name="awayGoals"
          label={t('FORMS.AWAY_SCORE')}
          options={getNumberOptions(50, 0)}
        />
      )}
      <ControlledSwitchInput control={control} name="isForfeit" label={t('FORMS.FORFEIT')} />
      <ControlledSwitchInput control={control} name="isComplete" label={t('FORMS.COMPLETED')} />
    </FormContainer>
  );
}
