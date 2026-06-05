import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ControlledDateInput,
  ControlledSelectInput,
  CustomTypography,
  FormContainer,
  FormErrorMessage,
  type ISelectOptions,
} from '../../../../components';
import { CustomStack } from '../../../../components/grids';
import { TApolloError } from '../../../../types/apollo';
import BatchResultConfirmation from '../../components/BatchResultConfirmation';
import { isCupMatch } from '../../helpers/isCupMatch';
import { useCompetitionRoundOptions } from '../../hooks/useResultInput';
import GameweekTeamsInput from './GameweekTeamsInput';
import { BatchResultSchema, BatchResultFormData } from './schema';

export type MatchRow = {
  homeTeam: string;
  awayTeam: string;
  kickoffTime?: string | null;
  homeGoals?: string | number;
  awayGoals?: string | number;
  isForfeit?: boolean;
  isComplete?: boolean;
  isBye?: boolean;
};

interface Props {
  onSubmit: (formData: BatchResultFormData) => void;
  competitionOptions: ISelectOptions[];
  teamOptions: ISelectOptions[];
  orgSeasonOptions: ISelectOptions[];
  defaultValues: BatchResultFormData;
  loading: boolean;
  error?: TApolloError;
}

export default function BatchResultForm({
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
    formState: { errors, isDirty, isValid },
    reset,
    getValues,
  } = useForm({
    defaultValues,
    resolver: zodResolver(BatchResultSchema),
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ name: 'matches', control });
  const currentSeasonId = useWatch({ control, name: 'orgSeasonId' });
  const currentCompetitionId = useWatch({ control, name: 'competitionId' });
  const currentGameWeek = useWatch({ control, name: 'gameWeek' });
  const matchesRaw = useWatch({ control, name: 'matches' });
  const matches = useMemo(() => matchesRaw || [], [matchesRaw]);
  const currentValues = useWatch({ control });
  const isCup = isCupMatch(competitionOptions, currentCompetitionId);
  const { roundOptions } = useCompetitionRoundOptions(
    currentSeasonId,
    currentCompetitionId,
    isCup ? 'cup' : undefined
  );
  const showGameWeek = Boolean(currentCompetitionId);
  const gameWeekLabel = isCup ? t('LABELS.ROUND') : t('FORM.LABELS.GAME_WEEK');

  const prevIsByeRef = useRef<(boolean | undefined)[]>([]);

  useEffect(() => {
    setValue('gameWeek', '', {
      shouldDirty: false,
      shouldValidate: false,
    });
    clearErrors('gameWeek');
  }, [currentCompetitionId, currentSeasonId, clearErrors, setValue]);

  useEffect(() => {
    if (!showGameWeek) {
      clearErrors('gameWeek');
      return;
    }
    if (currentGameWeek === '' || currentGameWeek === undefined || currentGameWeek === null) return;

    const isValidOption = roundOptions.some(
      option => String(option.value) === String(currentGameWeek)
    );
    if (!isValidOption) {
      setValue('gameWeek', '', {
        shouldDirty: false,
        shouldValidate: true,
      });
      clearErrors('gameWeek');
    }
  }, [clearErrors, currentGameWeek, roundOptions, setValue, showGameWeek]);

  // Clear per-match fields when a match transitions to isBye=true.
  // Uses a ref to track previous isBye values so setValue is only called on the
  // false→true transition, preventing an infinite loop.
  useEffect(() => {
    const prevIsBye = prevIsByeRef.current;
    matches.forEach((m, i) => {
      if (m?.isBye && !prevIsBye[i]) {
        setValue(`matches.${i}.awayTeam`, '', { shouldDirty: false, shouldValidate: false });
        setValue(`matches.${i}.homeGoals`, undefined, {
          shouldDirty: false,
          shouldValidate: false,
        });
        setValue(`matches.${i}.awayGoals`, undefined, {
          shouldDirty: false,
          shouldValidate: false,
        });
        setValue(`matches.${i}.kickoffTime`, '09:00', {
          shouldDirty: false,
          shouldValidate: false,
        });
        clearErrors([`matches.${i}.awayTeam`, `matches.${i}.homeGoals`, `matches.${i}.awayGoals`]);
      }
    });
    prevIsByeRef.current = matches.map(m => m?.isBye);
  }, [matches, clearErrors, setValue]);

  // When competition switches to a non-cup type, reset isBye and restore all
  // bye-cleared fields back to their defaults.
  useEffect(() => {
    if (isCup) return;
    const currentMatches = getValues('matches');
    currentMatches?.forEach((m, i) => {
      if (m?.isBye) {
        setValue(`matches.${i}.isBye`, false, { shouldDirty: false, shouldValidate: false });
        setValue(`matches.${i}.awayTeam`, '', { shouldDirty: false, shouldValidate: false });
        setValue(`matches.${i}.homeGoals`, 0, { shouldDirty: false, shouldValidate: false });
        setValue(`matches.${i}.awayGoals`, 0, { shouldDirty: false, shouldValidate: false });
        setValue(`matches.${i}.kickoffTime`, '09:00', {
          shouldDirty: false,
          shouldValidate: false,
        });
      }
    });
  }, [isCup, getValues, setValue]);

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      submitBtn={{
        disabled: !isDirty || !isValid,
        confirm: {
          show: true,
          title: t('MESSAGES.RESULTS_TO_ADD'),
          content: (
            <BatchResultConfirmation
              results={currentValues as BatchResultFormData}
              teamOptions={teamOptions}
            />
          ),
        },
      }}
      onReset={() => reset(defaultValues)}
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
      {showGameWeek ? (
        <ControlledSelectInput
          control={control}
          name="gameWeek"
          label={gameWeekLabel}
          options={roundOptions}
        />
      ) : null}

      {errors.matches ? <FormErrorMessage error={errors.matches} /> : null}
      <CustomStack direction="row" justify="space-between">
        <CustomTypography>
          {t('MESSAGES.MATCHES_ADDED')}{' '}
          <CustomTypography bold color="data">
            {matches.length}
          </CustomTypography>
        </CustomTypography>
        <Button
          color="primary"
          onClick={() =>
            append({
              homeTeam: '',
              awayTeam: '',
              homeGoals: 0,
              awayGoals: 0,
              kickoffTime: '09:00',
              isComplete: false,
            })
          }
        >
          {t('BUTTONS.ADD_MATCH')}
        </Button>
      </CustomStack>
      {fields.map((f, idx) => {
        const excludedTeams = matches
          .flatMap((m, i) => (i === idx ? [] : [m?.homeTeam, m?.awayTeam]))
          .filter(Boolean) as string[];

        const currentHome = matches[idx]?.homeTeam as string | undefined;
        const currentAway = matches[idx]?.awayTeam as string | undefined;

        return (
          <GameweekTeamsInput
            key={f.id}
            index={idx}
            control={control}
            teamOptions={teamOptions}
            remove={remove}
            excludedTeams={excludedTeams}
            currentHome={currentHome}
            currentAway={currentAway}
            isBye={Boolean(matches[idx]?.isBye)}
            isCup={isCup}
          />
        );
      })}
    </FormContainer>
  );
}
