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
import { isCupMatch } from '../../helpers/isCupMatch';
import { useCompetitionRoundOptions } from '../../hooks/useResultInput';
import { useResultEffects } from '../useResultEffects';
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
    clearErrors,
    setValue,
    formState: { isDirty, isValid },
    reset,
  } = useForm<ResultFormData>({
    defaultValues,
    resolver: zodResolver(ResultSchema),
    mode: 'onChange',
  });

  const currentDate = useWatch({ control, name: 'date' });
  const currentSeasonId = useWatch({ control, name: 'orgSeasonId' });
  const currentCompetitionId = useWatch({ control, name: 'competitionId' });
  const currentGameWeek = useWatch({ control, name: 'gameWeek' });
  const isBye = useWatch({ control, name: 'isBye' });
  const currentValues = useWatch({ control });
  const isFutureMatch = isFuture(new Date(currentDate));
  const isCup = isCupMatch(competitionOptions, currentCompetitionId);

  const { roundOptions } = useCompetitionRoundOptions(
    currentSeasonId,
    currentCompetitionId,
    isCup ? 'cup' : undefined
  );
  const showGameWeek = Boolean(currentCompetitionId);
  const gameWeekLabel = isCup ? t('LABELS.ROUND') : t('FORM.LABELS.GAME_WEEK');

  useResultEffects({
    currentCompetitionId,
    currentSeasonId,
    currentGameWeek,
    isBye,
    roundOptions,
    showGameWeek,
    setValue,
    clearErrors,
  });

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
        label={t('FORM.LABELS.DATE')}
        disableFuture={false}
      />
      <ControlledSelectInput
        control={control}
        name="kickoffTime"
        label={t('FORM.LABELS.KICKOFF_TIME')}
        options={getKickoffTimeOptions()}
      />
      <ControlledSelectInput
        control={control}
        name="orgSeasonId"
        label={t('FORM.LABELS.SEASON')}
        options={orgSeasonOptions}
      />
      <ControlledSelectInput
        control={control}
        name="competitionId"
        label={t('FORM.LABELS.COMPETITION')}
        options={competitionOptions}
      />
      {isCup && (
        <ControlledSwitchInput control={control} name="isBye" label={t('FORM.LABELS.IS_BYE')} />
      )}
      {showGameWeek ? (
        <ControlledSelectInput
          control={control}
          name="gameWeek"
          label={gameWeekLabel}
          options={roundOptions}
        />
      ) : null}
      <ControlledSelectInput
        control={control}
        name="homeTeam"
        label={t('FORM.LABELS.HOME_TEAM')}
        options={teamOptions}
      />
      {!isFutureMatch && (
        <ControlledSelectInput
          control={control}
          disabled={isBye}
          name="homeGoals"
          label={t('FORM.LABELS.HOME_SCORE')}
          options={getNumberOptions(50, 0)}
        />
      )}
      {
        <ControlledSelectInput
          control={control}
          disabled={isBye}
          name="awayTeam"
          label={t('FORM.LABELS.AWAY_TEAM')}
          options={teamOptions}
        />
      }
      {!isFutureMatch && (
        <ControlledSelectInput
          control={control}
          disabled={isBye}
          name="awayGoals"
          label={t('FORM.LABELS.AWAY_SCORE')}
          options={getNumberOptions(50, 0)}
        />
      )}
      <ControlledSwitchInput
        control={control}
        name="isForfeit"
        disabled={isBye}
        label={t('FORM.LABELS.FORFEIT')}
      />
      <ControlledSwitchInput
        control={control}
        name="isComplete"
        label={t('FORM.LABELS.COMPLETED')}
      />
    </FormContainer>
  );
}
