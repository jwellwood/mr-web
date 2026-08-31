import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useMemo } from 'react';
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
import { useResultInputs } from '../../hooks/useResultInputs';
import GameweekTeamsInput from './GameweekTeamsInput';
import { BatchResultSchema, BatchResultFormData, requiredFields } from './schema';

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
  orgSeasonOptions: ISelectOptions[];
  defaultValues: BatchResultFormData;
  loading: boolean;
  error?: TApolloError;
}

export default function BatchResultForm({
  onSubmit,
  defaultValues,
  orgSeasonOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('results');
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(BatchResultSchema),
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ name: 'matches', control });
  const currentCompetitionId = useWatch({ control, name: 'competitionId' });
  const matchesRaw = useWatch({ control, name: 'matches' });
  const matches = useMemo(() => matchesRaw || [], [matchesRaw]);
  const currentValues = useWatch({ control });
  const { isCup, teamOptions, competitionOptions, roundOptions } =
    useResultInputs(currentCompetitionId);

  const showGameWeek = Boolean(currentCompetitionId);
  const gameWeekLabel = isCup ? t('LABELS.ROUND') : t('FORM.LABELS.GAME_WEEK');

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
        required={requiredFields.date}
      />
      <ControlledSelectInput
        control={control}
        name="orgSeasonId"
        label={t('FORM.LABELS.SEASON')}
        options={orgSeasonOptions}
        required={requiredFields.orgSeasonId}
      />
      <ControlledSelectInput
        control={control}
        name="competitionId"
        label={t('FORM.LABELS.COMPETITION')}
        options={competitionOptions || []}
        required={requiredFields.competitionId}
      />
      {showGameWeek ? (
        <ControlledSelectInput
          control={control}
          name="gameWeek"
          label={gameWeekLabel}
          options={roundOptions}
          required={requiredFields.gameWeek}
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
            teamOptions={teamOptions || []}
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
